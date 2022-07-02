#!/usr/bin/env node
import readline from 'readline';
import { Context } from './Context';
import { 에러상태, 최초설정, 최초확인, 통과상태, 확인상태 } from './State';

const context = new Context();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const answerCallback = async (answer: string) => {
    if (answer === '비밀번호설정') {
        context.set초기화면여부(true)
    } else {
        rl.question('최초 비밀번호를 설정해주세요!\n', (password: string) => {
            context.set초기화면여부(false, password)
            recursive();
        });
    }
    context.awake();
    recursive();
};

const recursive = () => {
    if (context.state instanceof 최초설정) {
        rl.question('최초 비밀번호를 설정해주세요!\n', (password: string) => {
            context.check(password);
            recursive()
        });
    }

    if (context.state instanceof 최초확인) {
        rl.question('다시한번 비밀번호를 설정해주세요!\n', (password: string) => {
            context.check(password);
            recursive()
        });
    }

    if (context.state instanceof 확인상태) {
        rl.question('비밀번호를 입력해주세요!\n', (password: string) => {
            context.check(password);
            recursive()
        });
    }

    if (context.state instanceof 에러상태) {
        rl.question('비밀번호가 틀렸습니다. 다시 비밀번호를 입력해주세요!\n', (password: string) => {
            context.check(password);
            recursive()
        });
    }

    if (context.state instanceof 통과상태) {
        rl.question('로그인 되었습니다!\n', () => {
            rl.close()
        });
    }
}

rl.question('테스트 시작 화면을 선택해주세요 (비밀번호설정 or 비밀번호입력) \n', answerCallback);



