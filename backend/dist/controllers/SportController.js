"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.findSportByName = exports.getAllSports = exports.createSport = void 0;
const Sport_1 = __importDefault(require("../models/Sport"));
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
const createSport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, country, players } = req.body;
        const sport = yield Sport_1.default.create({
            name,
            description,
            country,
            players,
        });
        return res.status(201).json(sport);
    }
    catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
    }
});
exports.createSport = createSport;
const getAllSports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sports = yield Sport_1.default.findAll();
        return res.status(200).json(sports);
    }
    catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
    }
});
exports.getAllSports = getAllSports;
const findSportByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const sport = yield Sport_1.default.findOne({ where: { name } });
        if (!sport) {
            return res.status(404).json({ error: 'Sport not found' });
        }
        console.log(sport);
        return res.status(200).json(sport);
    }
    catch (error) {
        console.error('Error finding sport:', error);
        return res.status(500).json({ error: 'Failed to find sport' });
    }
});
exports.findSportByName = findSportByName;
const updateSport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const { description, country, players } = req.body;
        console.log('Received data for update:', { description, country, players });
        if (typeof players !== 'number' || isNaN(players)) {
            return res.status(400).json({ error: 'Invalid number of players' });
        }
        const sport = yield Sport_1.default.findOne({ where: { name } });
        if (sport) {
            sport.description = description;
            sport.country = country;
            sport.players = players;
            console.log('Updating sport:', sport);
            yield sport.save();
            return res.status(200).json(sport);
        }
        return res.status(404).json({ error: 'Sport not found' });
    }
    catch (error) {
        console.error('Error updating sport:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateSport = updateSport;
const deleteSport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const sport = yield Sport_1.default.findOne({ where: { name } });
        if (sport) {
            yield sport.destroy();
            return res.status(200).json({ message: "Sport deleted" });
        }
        return res.status(404).json({ error: "Sport not found" });
    }
    catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
    }
});
exports.deleteSport = deleteSport;
