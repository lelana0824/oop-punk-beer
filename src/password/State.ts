import { IContext } from "./Context"

export interface PasswordState {
    awake: (context: IContext) => void
    check?: (password: string, context: IContext) => void
}

export class 등록여부확인 implements PasswordState {
    awake(context: IContext) {
        if (context.check등록여부()) {
            context.setState(new 확인상태())
            return
        }
        context.setState(new 최초설정())
        return;
    }
}

export class 최초설정 implements PasswordState {
    awake() {
        return;
    }

    check(password: string, context: IContext) {
        context.setPassword(password);
        context.setState(new 최초확인())
    }
}
export class 최초확인 implements PasswordState {
    awake() {
        return
    }

    check(password: string, context: IContext) {
        if (password !== context.password) {
            context.setState(new 에러상태())
            return
        }
        context.setState(new 통과상태())
        return
    }
}

export class 확인상태 implements PasswordState {
    awake() {
        return
    }

    check(password: string, context: IContext) {
        if (password !== context.password) {
            context.setState(new 에러상태())
            return
        }
        context.setState(new 통과상태())
        return
    }
}

export class 에러상태 implements PasswordState {
    awake() {
        return
    }

    check(password: string, context: IContext) {
        if (password === context.password) {
            context.setState(new 통과상태())
            return
        }
    }
}

export class 통과상태 implements PasswordState {
    awake() {
        return
    }

    check(password: string, context: IContext) {
        return
    }
}
