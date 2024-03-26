const express = require("express");
const morgan = require("morgan"); 
const { check, validationResult } = require("express-validator");
const dao = require("./dao"); 
const cors = require("cors");

const session = require("express-session"); 

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./public")); 

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api/user", (req, res) => {
  dao
    .getUser()
    .then((user) => {
      res.json(user);
    })
    .catch(() => {
      res.status(500).end();
    });
});

app.post("/api/user/selectitem", async (req, res) => {
  try {
    console.log(req.body);
    const result = await dao.selectItem(req.body);
    return res.status(201).json(`Item ${req.body} selected!`);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post("/api/feedme", async (req, res) => {
  try {
    const checkedFood = await dao.checkFood(req.body.food);
    if (checkedFood.is_good == true) {
      await dao.earnExp({ exp: 5 });
      await dao.earnCoins({ coins: 30 });
    } else {
      await dao.earnExp({ exp: 1 });
      await dao.earnCoins({ coins: 2 });
    }
    const isNewLevel = await dao.isNewLevel();
    if (isNewLevel === true) {
      const result = await dao.newLevel();
    }
    const tip = await dao.getLockedTip();
    if (tip !== undefined) {
      await dao.unlockTip(tip);
      const response = {
        is_good: checkedFood.is_good,
        feedback: checkedFood.feedback,
        tip: tip,
      };
      res.json(response);
    } else {
      const tip = {
        description: "You have unlocked all the Tips, go check them!",
      };
      const response = {
        is_good: checkedFood.is_good,
        feedback: checkedFood.feedback,
        tip: tip,
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post("/api/feedme/goals", async (req, res) => {
  try {
    await dao.reduceTrials();
    const changes1 = await dao.increaseSuccess(req.body.food);
    const changes2 = await dao.setGoalsFinished();
    const anyGoalCompleted = await dao.isAnyGoalCompleted();
    res.json(anyGoalCompleted);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post("/api/feedme/international", async (req, res) => {
  try {
    await dao.cookInternationalDish(req.body.food);
    const id_international_item = await dao.getInternationalItemId(
      req.body.food
    );
    if (id_international_item !== undefined) {
      await dao.unlockInternationalItem({ id: id_international_item.item_id });
      const result = await dao.setInternationalDishCompleted(req.body.food);
      res.status(201).json(result);
    } else {
      res.status(204).json(false);
    }
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/api/goals/checkresults", async (req, res) => {
  try {
    const successfullyCompleted = await dao.isGoalSuccessfullyCompleted(
      req.body.goal
    );

    if (successfullyCompleted.exists) {
      await dao.deselectGoal(req.body.goal);
      await dao.earnExp({ exp: successfullyCompleted.exp });
      await dao.earnCoins({ coins: successfullyCompleted.coins });
      const isNewLevel = await dao.isNewLevel();
      if (isNewLevel === true) {
        const result = await dao.newLevel();
      }
    } else {
      const changes = await dao.resetGoal(req.body.goal);
    }
    res.json({ successfullyCompleted: successfullyCompleted.exists });
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/api/items", (req, res) => {
  dao
    .getItems()
    .then((list) => res.json(list))
    .catch(() => res.status(500).end());
});

app.get("/api/tips", (req, res) => {
  dao
    .getTips()
    .then((list) => res.json(list))
    .catch(() => res.status(500).end());
});

app.get("/api/goals", (req, res) => {
  dao
    .getGoals()
    .then((list) => res.json(list))
    .catch(() => res.status(500).end());
});

app.get("/api/goalbyid/:goalToSend", (req, res) => {
  dao
    .getGoalById(req.params.goalToSend)
    .then((goal) => res.json(goal))
    .catch(() => res.status(500).end());
});

app.post("/api/selectgoal", async (req, res) => {
  try {
    const result = await dao.selectGoal(req.body.goal);
    return res.status(201).json(`Goal ${req.body.goal} selected!`);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post("/api/disactivegoal", async (req, res) => {
  try {
    const result = await dao.resetGoal(req.body.goal);
    return res.status(201).json(`Goal ${req.body.goal.id} disactivated!`);
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/api/internationaldishes", (req, res) => {
  dao
    .getInternationalDishes()
    .then((list) => res.json(list))
    .catch(() => res.status(500).end());
});

app.get("/api/internationaldishes/:dishId", (req, res) => {
  dao
    .getInternationalDishById(req.params.dishId)
    .then((dish) => res.json(dish))
    .catch(() => res.status(500).end());
});

app.post("/api/shop/buy", async (req, res) => {
  console.log(req.body);
  try {
    await dao.payCoins(req.body);
    const result = await dao.buyItem(req.body);
    return res.status(201).json(`Item ${req.body.name} bought!`);
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/api/user/personalize", async (req, res) => {
  try {
    await dao.selectItem(req.body.item);
    return res.status(201).json("Skin updated with ${req.body.item.name}!");
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/api/spin", async (req, res) => {
  try {
    await dao.payCoins({ coins: 300 });
    const dishToUnlock = await dao.getInternationalDish();
    const result = await dao.unlockInternationaDish(dishToUnlock);
    return res.status(201).json(dishToUnlock);
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/api/dailymeal", (req, res) => {
  dao
    .getDailyMeal()
    .then((list) => res.json(list))
    .catch(() => res.status(500).end());
});
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is Working!!!🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
