export namespace markdown
{
    class Markdown
    {
        static buildBlockOrder(d: any): void;
        static buildInlinePatterns(d: any): void;
        static dialects: {
            Gruber: {
                block: any;
                inline: any;
            };
            Maruku: {
                block: any;
                inline: any;
                processMetaHash: any;
            };
        };
        static mk_block(block: any, trail: any, line: any, ...args: any[]): any;
        static subclassDialect(d: any): any;
        constructor(dialect: any);
        dialect: any;
        em_state: any;
        strong_state: any;
        debug_indent: any;
        debug(...args: any[]): void;
        loop_re_over_block(re: any, block: any, cb: any): any;
        processBlock(block: any, next: any): any;
        processInline(block: any): any;
        split_blocks(input: any, startLine: any): any;
        toTree(source: any, custom_root: any): any;
    }
    namespace Markdown
    {
        namespace DialectHelpers
        {
            function inline_until_char(text: any, want: any): any;
        }
    }
    function parse(source: any, dialect: any): any;
    function renderJsonML(jsonml: any, options: any): any;
    function toHTML(source: any, dialect?: any, options?: any): any;
    function toHTMLTree(input: any, dialect: any, options: any): any;
}
export function parse(source: any, dialect: any, options: any): any;
