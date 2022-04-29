import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { autheticateToken } from "../middleware/authorization.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

