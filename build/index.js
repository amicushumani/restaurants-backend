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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express_1 = __importDefault(require("express"));
var dbClient = require('./dbClient');
var app = express_1.default();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('get was called');
                return [4 /*yield*/, dbClient.query('SELECT * FROM restaurants;')];
            case 1:
                rows = (_a.sent()).rows;
                console.log('rows returned ', rows);
                if (rows.length > 0) {
                    res.status(200).send(rows);
                    return [2 /*return*/];
                }
                else {
                    return [2 /*return*/, res.status(200).send([{ id: 0, name: 'No Restaurants Found', rating: 0 }])];
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, rating, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, rating = _a.rating;
                console.log('adding res', name, rating);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dbClient.query('INSERT INTO restaurants (name, rating) VALUES($1, $2);', [name, rating])];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                res.status(500).send('Somethig went wrong');
                return [3 /*break*/, 4];
            case 4:
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); });
// TODO: add editding form in frontend
app.post('/edit/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, rating;
    return __generator(this, function (_b) {
        id = req.params.id;
        _a = req.body, name = _a.name, rating = _a.rating;
        try {
            dbClient.query("UPDATE restaurants set name=$1, rating=#2 WHERE id=$3", [name, rating, id]);
        }
        catch (e) {
            res.send(500).send('Failed to update restaurant');
        }
        //   @ts-ignore
        res.staus(200).send();
        return [2 /*return*/];
    });
}); });
app.post('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dbClient.query('DELETE FROM restaurants WHERE id=$1', [id])];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(500).send('unable to delte restauarant')];
            case 4:
                res.status(200).send('Restaurant deleted');
                return [2 /*return*/];
        }
    });
}); });
app.post('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, rating;
    return __generator(this, function (_b) {
        id = req.params.id;
        _a = req.body, name = _a.name, rating = _a.rating;
        if (!name || !rating || !id) {
            res.status(500).send('Failed to update restaurant');
        }
        dbClient.query("UPDATE restaurants SET name=$1, rating=$2 WHERE id=$3", [name, rating, id]);
        res.status(200).send("Updated restaurant " + id);
        return [2 /*return*/];
    });
}); });
if (!dbClient) {
    console.error('There was not connection established with database');
    process.exit(1);
}
var PORT = process.env.port || 8000;
app.listen(PORT, function () {
    console.log("App is listening on port:" + PORT);
});
