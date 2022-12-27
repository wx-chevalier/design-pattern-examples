<?php

namespace RefactoringGuru\ChainOfResponsibility\Structural;

/**
 * Chain of Responsibility Design Pattern
 *
 * Intent: Avoid coupling a sender of a request to its receiver by giving more
 * than one object a chance to handle the request. Chain the receiving objects
 * and then pass the request through the chain until some receiver handles it.
 */

/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
interface Handler
{
    public function setNext(Handler $handler): Handler;

    public function handle($request): ?string;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
abstract class AbstractHandler implements Handler
{
    /**
     * @var Handler
     */
    private $nextHandler;

    /**
     * @param Handler $handler
     * @return Handler
     */
    public function setNext(Handler $handler): Handler
    {
        $this->nextHandler = $handler;
        // Returning a handler from here will let us link handlers in a
        // convenient way like this:
        // $monkey->setNext($squirrel)->setNext($dog);
        return $handler;
    }

    public function handle($request): ?string
    {
        if ($this->nextHandler) {
            return $this->nextHandler->handle($request);
        }
        
        return null;
    }
}

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class MonkeyHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "Banana") {
            return "Monkey: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

class SquirrelHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "Nut") {
            return "Squirrel: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

class DogHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "MeatBall") {
            return "Dog: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function clientCode(Handler $handler)
{
    foreach (["Nut", "Banana", "Cup of coffee"] as $food) {
        echo "Client: Who wants a ".$food."?\n";
        $result = $handler->handle($food);
        if ($result) {
            echo "  ".$result;
        } else {
            echo "  ".$food." was left untouched.\n";
        }
    }
}

/**
 * The other part of the client code constructs the actual chain.
 */
$monkey = new MonkeyHandler;
$squirrel = new SquirrelHandler;
$dog = new DogHandler;

$monkey->setNext($squirrel)->setNext($dog);

/**
 * The client should be able to send a request to any handler, not just the
 * first one in the chain.
 */
echo "Chain: Monkey > Squirrel > Dog\n\n";
clientCode($monkey);
echo "\n";

echo "Subchain: Squirrel > Dog\n\n";
clientCode($squirrel);
