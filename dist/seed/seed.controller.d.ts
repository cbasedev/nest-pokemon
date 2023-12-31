import { SeedService } from './seed.service';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    executeSeed(): Promise<import("./interfaces/poke-response.interface").Result[]>;
}
