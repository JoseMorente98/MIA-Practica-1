"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HolaController = /** @class */ (function () {
    function HolaController() {
        this.getAll = function (req, res) {
            res.json('Hola Mundo :D');
        };
    }
    HolaController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return HolaController;
}());
exports.default = HolaController;
