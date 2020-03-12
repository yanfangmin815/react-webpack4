import React, { useReducer, useEffect } from 'react';
import { run, useConcent } from 'concent';
import * as logic from '@/assets/utils/logic';
import { AAAAAA } from './math'
const parse = require('@babel/parser').parse;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default
const code = `let p = new Promise(function(reslove,reject){
                // reslove('成功')  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
                console.log(run())
                reject('失败')  //状态由等待变为失败，传的参数作为then函数中失败函数的实参
            }) `;
const ast = parse(code);
const setup = ctx => {
    //实例级别的计算函数
    const fetchProducts = ({type, sex, addr, keyword}) => {
        console.log(type, 'STATE')
        setTimeout(() => {
            console.log('request coming back......')
        }, 1000)
    }

    const generatorNumber = () => {
        // 1.生成数字 1
        const number = t.numericLiteral(1);
        // 2.生成二元表达式 1 + 1
        const exp = t.binaryExpression('+', number, number);
        // 3.生成变量 a
        const varible = t.identifier('a');
        // 4.生成变量声明 a = 1 + 1
        const declarations = t.variableDeclarator(varible, exp);
        // 5.生成变量声明 const a = 1 + 1
        const content = t.variableDeclaration('const', [declarations]);
        return content
    }

    /**
     * id, 
     * params, 
     * body,
     * generator,
     * async
     */
    const generatorVariableDeclaration = () => {
        /**
         * object: required
         * property: required
         */
        const Identifier1 = t.identifier('console')
        const Identifier2 = t.identifier('log')
        const memberExpression = t.memberExpression(Identifier1, Identifier2)
        /**
         * callee: required
         * arguments: required
         */
        const StringLiteral = t.stringLiteral('HELLO AST!!')
        const callExpression = t.callExpression(memberExpression, [StringLiteral])
        const expressionStatement = t.expressionStatement(callExpression)
        const blockStatement = t.blockStatement([expressionStatement])
        /**
         * id: Identifier (default: null)
         * params: Array<LVal> (required)
         * body: BlockStatement (required)
         */
        const variable1 = t.identifier('BB');
        const variable2 = t.identifier('CC');
        const params = [variable1, variable2]
        const functionExpression = t.functionExpression(null, params, blockStatement)
        /**
         * id: LVal (required)
         * init: Expression (default: null)
         */
        const variable = t.identifier('aa');
        const variableDeclarator = t.variableDeclarator(variable, functionExpression)
        /**
         * kind: "var" | "let" | "const" (required)
         * declarations: Array<VariableDeclarator> (required)
         */
        const variableDeclaration = t.variableDeclaration('const', [variableDeclarator])
        return variableDeclaration
    }

    const generateTryStatementBlockStatement = () => {
        // param-1
        /**
         * object: required
         * property: required
         */
        const identifier = t.identifier('console')
        const identifier1 = t.identifier('log')
        const memberExpression = t.memberExpression(identifier, identifier1)
        const StringLiteral = t.stringLiteral('HELLO AST!!')
        /**
         * callee: required
         * arguments: required
         */
        const callExpression = t.callExpression(memberExpression, [StringLiteral])
        const expressionStatement = t.expressionStatement(callExpression)
        /**
         * body: Array<Statement> (required)
         * directives: Array<Directive> (default: [])
         */
        const blockStatement = t.blockStatement([expressionStatement]) // param-1
        return blockStatement
    }

    const generateCatchClause = () => {
        // param-2
        const identifier3 = t.identifier('err')
        const identifier1 = t.identifier('console')
        const identifier2 = t.identifier('log')
        const memberExpression = t.memberExpression(identifier1, identifier2)
        /**
         * operator: "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=" (required)
         * left: Expression (required)
         * right: Expression (required)
         */
        const StringLiteral = t.stringLiteral('err is:')
        const identifier = t.identifier('err')
        const binaryExpression = t.binaryExpression('+',StringLiteral, identifier)
        /**
         * callee: required
         * arguments: required
         */
        const callExpression = t.callExpression(memberExpression, [binaryExpression])
        const expressionStatement = t.expressionStatement(callExpression)

        const blockStatement = t.blockStatement([expressionStatement])
        const catchClause = t.catchClause(identifier3, blockStatement) // param-2
        return catchClause
    }

    const generateBlockStatement2 = () => {
         // param-3
         const identifier = t.identifier('console')
         const identifier1 = t.identifier('log')
         const memberExpression = t.memberExpression(identifier, identifier1)
        
         const StringLiteral = t.stringLiteral('exec finally')
         /**
          * callee: required
          * arguments: required
          */
         const callExpression = t.callExpression(memberExpression, [StringLiteral])
         const expressionStatement = t.expressionStatement(callExpression)
 
         const blockStatement = t.blockStatement([expressionStatement])
         return blockStatement
    }
    /**
     * 
     */
    const generateTryStatement = () => {
        const tryStatementBlockStatement = generateTryStatementBlockStatement()
        const catchClause = generateCatchClause()
        const blockStatement2 = generateBlockStatement2()
        /**
         * block: BlockStatement (required)
         * handler: CatchClause (default: null)
         * finalizer: BlockStatement (default: null)
         */
        const tryStatement = t.tryStatement(tryStatementBlockStatement, catchClause, blockStatement2)
        return tryStatement
    }

    const testPromise = () => {
        /**
         * 便于理解我一步步拆解，这个其实就是拆解代码的逆过程
         * 刚接触的话可以根据ast explore中生成的语法树中的type,
         * 去到@babel/type中查找相应type,会有相应的方法和入参说明
         */
        // 生成const a  = 1 + 1;
        const content = generatorNumber()
        // 生成函数声明
        const variableDeclaration = generatorVariableDeclaration()
        // 为函数包裹try...catch...finally
        const tryStatement = generateTryStatement()

        // 将内容放入body中
        // ast.program.body.push(content);
        // ast.program.body.push(variableDeclaration);
        // ast.program.body.push(tryStatement);

        // 改 - 向数组中添加属性
        const property = t.objectProperty(t.identifier('c'), t.stringLiteral('c'));
        traverse(ast, {
             Program: {
                exit(path) {
                    console.log(ast, '>>>>>>>>>>>>')
                     // 设置输出格式
                    const output = generate(ast, { 
                        quotes: 'single', 
                        retainLines: false, 
                        compact:false,
                        concise: true
                    });
                    // console.log(path, '>>>>>>>>>>>>')
                }
            },
            ObjectExpression(path) {
                // console.log(path, 'ObjectExpression');
                // if (path.parent.id.name == 'obj') {
                //     path.pushContainer('properties', property);
                // }
                // path.pushContainer('properties', property);
            },
            FunctionDeclaration(path) {
                // console.log(path.node.body.body, 'FunctionDeclaration');
                // const types = path.node.body.body.map((item, index) => {
                //     return item.type
                // })
                // console.log(types)
                // const number = t.numericLiteral(1);
                // path.pushContainer('params', number);
            },
            VariableDeclaration(path) {
                // console.log(path, 'VariableDeclaration');
            },
            // 使用相应type来快速访问节点，这里快速来到二元表达式节点，即 1 + 1
            // 并使用path.replaceWith() 将节点 1 + 1替换
            ExpressionStatement(path) {
                // console.log(path,'??????????????????')
            },
            BlockStatement(path) {
                // console.log(path.node.body, '>>>>???????')
            }
        });
    }

    const testExtends = () => {
        setTimeout(function() {
            console.log('timeout1');
        })
        
        new Promise(function(resolve) {
            console.log('promise1');
            for(var i = 0; i < 1000; i++) {
                i == 99 && resolve();
            }
            console.log('promise2');
        }).then(function() {
            console.log('then1');
        })
        
        console.log('global1');
        // function Father(name) {
        //      this.name = name
        //      this.arr = [1,2,3]
        //      this.fun = function() {
        //         console.log(334234564564564564565436)
        //      }
        //     }
        //      
        //     Father.prototype.getName = function() {
        //      console.log(this.name)
        //     }
        //     new Father(function() {fun()})
        //     function Son(name, age) {
        //      Father.call(this)
        //      this.age = age
        //      this.name = name
        //     }
        //      
        //     Son.prototype = new Father()
        //     Son.prototype.constructor = Son
        //     Son.prototype.getAge = function() {
        //      console.log(this.age)
        //     }
            //  
            // var son1 = new Son("小名", 23)
            // son1.arr.push(4)
            // console.log(son1.arr) //1,2,3,4
            // son1.getName()    //小名
            // son1.getAge()     //23
            //  
            // var son2 = new Son("一灯", 24)
            // console.log(son2.arr) //1,2,3
            // son2.getName() //一灯
            // son2.getAge()
    }

    ctx.effect(({state}) => {
        testPromise()
        // testExtends()
    }, []);//这里只需要传key名称就可以了

    ctx.effect(() => {
        return () => {
            // 返回一个清理函数
            // 等价于componentWillUnmout, 这里搞清理事情
        };
    }, []);

    return {// 返回结果收集在ctx.settings里
        fetchProducts,
        //推荐使用此方式，把方法定义在settings里，下面示例故意直接使用sync语法糖函数
        // changeType: ctx.sync('type'),
        updateType: e=> ctx.invoke(logic.complexUpdate, e.currentTarget.value),
        clickTitle: e=> ctx.invoke(logic.complexUpdateTitle, e.currentTarget.innerHTML),
    }
};
// console.log(67657865786, AAAAAA)
const ConcentFnPage = React.memo(function({ tag: propTag }) {
    // run()
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, module:'product' });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle } = settings;

    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
            <h1 style={{
                overflow : 'hidden',
                textOverflow: 'ellipsis',
            width: '200px', 
            display: '-webkit-box',
            WebkitBoxOrient:'vertical',
            WebLineClamp:2}}>concent setup compnentkdfhjsdkafhjasjfasdjfkljds;fjdsfkjdsalkjflkdsajfdas</h1>
        </div>
    );
});

export default ConcentFnPage;
