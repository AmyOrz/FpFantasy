export declare class AjaxUtil {
    static create(): AjaxUtil;
    ajax(params: any): void;
    private _jsonp(params);
    private _json(params);
    private _formatParams(data);
    private _random();
}
