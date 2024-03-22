
const URL = 'http://localhost:3001/api';



/*          HOME         */
async function getUser() {

    const response = await fetch(URL + `/user`, {
        credentials: "include"
    });
    const user = await response.json();

    if (response.ok) {
        return user;

    } else {
        throw user;
    }
}

async function selectItem(item) {

    const response = await fetch(URL + `/user/selectitem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, item)),
        credentials: "include"
    });

    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}

async function feedMe(food) {

    const response = await fetch(URL + `/feedme`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, food)),
        credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
}

async function feedMeGoals(food) {

    const response = await fetch(URL + `/feedme/goals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, food)),
        credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
}

async function feedMeInternational(food) {
    const response = await fetch(URL + `/feedme/international`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, food)),
        credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
}

async function checkResults(goal) {
    const response = await fetch(URL + `/goals/checkresults`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, goal)),
        credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
}

async function getItems() {
    const response = await fetch(URL + `/items`, {
        credentials: "include"
    });
    const items = await response.json();
    if (response.ok) {
        return items;
    } else {
        throw items;
    }
}



async function getTips() {
    const response = await fetch(URL + `/tips`, {
        credentials: "include"
    });
    const tips = await response.json();
    if (response.ok) {
        return tips;
    } else {
        throw tips;
    }
}

async function getDailyMeal() {
    const response = await fetch(URL + `/dailyMeal`, {
        credentials: "include"
    });
    const meal = await response.json();

    if (response.ok) {
        return meal;
    } else {
        throw meal;
    }
}

async function getGoals() {
    const response = await fetch(URL + `/goals`, {
        credentials: "include"
    });
    const goals = await response.json();
    if (response.ok) {
        return goals;
    } else {
        throw goals;
    }
}

async function getGoalById(goalToSend) {
    const response = await fetch(URL + `/goalbyid/${goalToSend}`);
    const goal = await response.json();
    if (response.ok) {
        return goal;
    } else {
        throw goal;
    }
}


async function selectGoal(goal) {
    const response = await fetch(URL + `/selectgoal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, goal)),
        credentials: "include"
    });
    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}

async function disactiveGoal(goal) {
    const response = await fetch(URL + `/disactivegoal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, goal)),
        credentials: "include"
    });
    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}

async function getInternationalDishes() {
    const response = await fetch(URL + `/internationaldishes`, {
        credentials: "include"
    });
    const dishes = await response.json();
    if (response.ok) {
        return dishes;
    } else {
        throw dishes;
    }
}

async function getInternationalDishById(dishId) {
    const response = await fetch(URL + `/internationaldishes/${dishId}`);
    const dish = await response.json();
    if (response.ok) {
        return dish;
    } else {
        throw dish;
    }
}


async function buyItem(item) {
    const response = await fetch(URL + `/shop/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, item)),
        credentials: "include"
    });
    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}

async function personalize(item) {
    const response = await fetch(URL + `/personalize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, item)),
        credentials: "include"
    });
    if (response.ok) {
     return response.json();
    } else {
        throw response;
    }
}

async function spin() {
    const response = await fetch(URL + `/spin`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}



const API = {
    getUser,
    selectItem,
    feedMe,
    feedMeGoals,
    feedMeInternational,
    checkResults,
    getItems,
    getTips,
    getDailyMeal,
    getGoals,
    getGoalById,
    selectGoal,
    disactiveGoal,
    getInternationalDishes,
    getInternationalDishById,
    buyItem,
    personalize,
    spin
}

export default API;