import {formatUtcString} from "./date-format";
import {randomSeed} from "./randomSeed";
import {generateRoute, loadAsyncRoutes} from "./processRoute";
import LocalCache from "./cache";

class Utils {
  formatUtcString(utcString: string, format?: string) {
    return formatUtcString(utcString, format);
  }
  randomSeed(seed: any, max?: number, min?: number) {
    return randomSeed(seed, max, min);
  }
  generateRoute(treeMenu: any) {
    return generateRoute(treeMenu);
  }
  LocalCache() {
    return LocalCache;
  }
  loadAsyncRoutes() {
    return loadAsyncRoutes();
  }
}

export default new Utils();
