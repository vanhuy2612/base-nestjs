export default class Env {
    static get(key: string) {
        return process.env[key];
    }
}