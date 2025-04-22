// __tests__/user_controller.test.js or user_controller.test.js
const { addUser } = require("../controllers/user_controller");
const { logIn } = require("../controllers/user_controller");
const { authCheck } = require("../controllers/user_controller");
const { updateUser } = require("../controllers/user_controller");

jest.mock("../models/User", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true)
  }));
});

describe("addUser controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); //resets all mocks before each test
  });
  
  it("should return 400 if required fields are missing", async () => {
    const req = {
      body: {
        // googleID: "123", // Missing fields intentionally
        username: "testUser",
        role: "client"
      },
    };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Provide all fields",
    });
  });

  it("Should return 201, if user added successfully", async () => {
    const req = {
      body: {
        googleID: "123",
        username: "testUser",
        role: "freelancer"
      },
    };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await addUser(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "New User Added Successfully",
    });
  });

  it("should return 500 for internal error", async () => {
    const req = {
      body: {
        googleID: "123",
        username: "testUser",
        role: "client"
      },
    };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockSave = jest.fn().mockRejectedValue(new Error("Database failure"));

    // Mock the User model to return an object with a save function that fails
    jest.mock("../models/User", () => {
      return jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
    });

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});

describe("updateUser controller", () => {
  it("Should output 400 if some fields missing", () => {
    const req = {
      params: {
        id: "1"
      },

      body: {
        googleID: "123",
        username: "testUser"
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),


    }
  });
});

describe("authCheck controller", () => {
  it("No req.user", () => {
    const req = { // no req.user

    }

    const res = {
      redirect: jest.fn(),
    }

    const next = jest.fn()

    authCheck(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith("/login")
  });
});

describe("authCheck controller", () => {
  it("User is already logged in", () => {
    const req = {
      user: {
        id: "123"
      }
    }

    const res = {
      redirect: jest.fn(),
    }

    const next = jest.fn()

    authCheck(req, res, next)

    expect(next).toHaveBeenCalled()
  });
});

describe("logIn controller", () => {
  it("Should output, you are logged in", () => {
    const req = {
    
    }

    const res = {
      send: jest.fn()
    };

    logIn(req, res);

    expect(res.send).toHaveBeenCalledWith("you are logged in, redirected to home page")
  });
});
