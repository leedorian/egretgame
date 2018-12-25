interface authSuccCallback {
    (response: authSuccResponse): void;
}
interface authFailedCallback {
    (response: authSuccResponse): void;
}
interface authSuccResponse {
    code: string;
}
interface authFailedResponse {
    reason: string;
}
declare namespace Wechat {
    function auth(scope: string, state: string, success: authSuccCallback, failed: authFailedCallback): void;
}
