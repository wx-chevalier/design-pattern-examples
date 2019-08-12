import { ConcreteSubject, ConcreteObserver } from './index';

const sub: ConcreteSubject = new ConcreteSubject();

sub.register(new ConcreteObserver(sub, 'Jancsi'));
sub.register(new ConcreteObserver(sub, 'Julcsa'));
sub.register(new ConcreteObserver(sub, 'Marcsa'));

sub.SubjectState = 123;
sub.notify();
