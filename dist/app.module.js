"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./config/app.config");
const joi_validation_1 = require("./config/joi.validation");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pokemon_module_1 = require("./pokemon/pokemon.module");
const seed_module_1 = require("./seed/seed.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    constructor() {
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot({
                load: [app_config_1.EnvConfiguration],
                validationSchema: joi_validation_1.JoiValidationSchema
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB, {
                dbName: 'pokemonsdb'
            }),
            pokemon_module_1.PokemonModule, common_module_1.CommonModule, seed_module_1.SeedModule
        ],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map