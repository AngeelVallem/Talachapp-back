const express = require("express");
const users = require("../usecases/users");

//Middlewares auth.js
const authMiddlewares = require("../middlewares/auth");
//
const router = express.Router();

// ADMIN-USERS-WORKERS

router.get("/", async (request, response) => {
  try {
    const allUsers = await users.getAll();
    response.json({
      success: true,
      message: "All Users",
      users: allUsers,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error not get Users",
      error: error.message,
    });
  }
});
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const user = await users.getById(id);
    response.json({
      success: true,
      message: "specific client found",
      data: {
        user,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "error at getting specific client",
      error: error.message,
    });
  }
});

router.get("/token/:token", async (request, response) => {
  try {
    const { token } = request.params;

    const user = await users.getUser(token);
    response.json({
      success: true,
      message: "specific client found",
      user,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "error at getting specific client",
      error: error.message,
    });
  }
});

// router.get("/:token" , async ( request , response) => {
//   try {
//     const user  = await users.getUser(request.params)
//     response.json({
//       success: true,
//       message: "All Users",
//       data: {
//         user
//       },
//     });
//   } catch (error) {
//     response.status(400);
//     response.json({
//       success: false,
//       message: "Error not get Users",
//       error: error.message,
//     });
//   }
// })

router.post("/register", async (request, response) => {
  try {
    const user = await users.signUp(request.body);
    const token = await users.signIn(request.body.email, request.body.password);

    response.json({
      success: true,
      message: "User registered",
      user,
      token,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Could not register",
      error: error.message,
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await users.signIn(email, password);

    response.json({
      success: true,
      message: "Logged in",
      token,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Could not log in",
      error: error.message,
    });
  }
});

router.patch("/:id", authMiddlewares.hasToken, async (request, response) => {
  try {
    const { id } = request.params;
    const userUpdated = await users.updateById(id, request.body);
    response.json({
      success: true,
      message: "User updated ",
      data: {
        user: userUpdated,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

router.patch("/:id", authMiddlewares.hasToken, async (request, response) => {
  try {
    const { id } = request.params;
    const avgstar = await users.updateScore(id, request.body);
    response.json({
      success: true,
      message: "add some stars",
      data: {
        newStars: avgstar,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

// JUST ADMIN

router.delete(
  "/:id",
  authMiddlewares.hasRole(["admin"]),
  async (request, response) => {
    try {
      const idUser = request.params.id;
      await users.deleteById(idUser);
      response.json({
        success: true,
        message: "User deleted",
      });
    } catch (error) {
      response.status(400);
      response.json({
        succes: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
