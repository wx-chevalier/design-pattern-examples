import { ConcreteMediator, ConcreteColleagueA, ConcreteColleagueB } from '.';

const cm: ConcreteMediator = new ConcreteMediator(),
  c1: ConcreteColleagueA = new ConcreteColleagueA(cm),
  c2: ConcreteColleagueB = new ConcreteColleagueB(cm);

cm.concreteColleagueA = c1;
cm.concreteColleagueB = c2;

c1.send('`send` of ConcreteColleagueA is being called!');
c2.send('`send` of ConcreteColleagueB is being called!');
