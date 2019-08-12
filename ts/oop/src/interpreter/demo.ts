import { Context, NonterminalExpression, TerminalExpression } from './';

let context: Context = new Context(),
  list = [],
  i = 0,
  max: number;

list.push(new NonterminalExpression());
list.push(new NonterminalExpression());
list.push(new NonterminalExpression());
list.push(new TerminalExpression());
list.push(new NonterminalExpression());
list.push(new NonterminalExpression());
list.push(new TerminalExpression());
list.push(new TerminalExpression());

for (i = 0, max = list.length; i < max; i += 1) {
  list[i].interpret(context);
}
