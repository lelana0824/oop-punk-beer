import { PasswordState, 등록여부확인, 최초설정, 확인상태 } from "./State";

export interface IContext {
    state: PasswordState;
    password: string;

    awake: () => void;
    check: (password: string) => void;
    setState: (state: PasswordState) => void;
    setPassword: (password: string) => void;
    check등록여부: () => boolean;
}

export class Context {
    state: PasswordState;
    password: string;

    constructor() {
        this.state = new 등록여부확인();
        this.password = ''
    };

    awake() {
        this.state.awake(this);
    };
    check(password: string) {
        this.state.check?.(password, this)
    };
    setState(state: PasswordState) {
        this.state = state;
    }
    check등록여부() {
        // API 호출로 확인?
        return true
    }
    setPassword(password: string) {
        this.password = password;
    }
    set초기화면여부(isPasswordSetting: boolean, password?: string) {
        if (isPasswordSetting) {
            this.state = new 최초설정()
            return
        }
        if (password) this.password = password;
        this.state = new 확인상태()
    }
}