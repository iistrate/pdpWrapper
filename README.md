# Select Wrapper

Select wrapper is built to break down a select box with options into an UL with Li's for styling purposes.

## Usage

* selector<string> => Selector for the immediate parent of the select
* style<string> => regular or dropdown; dropdown makes the list behave as a drop down
* callback<function> => function to be called after object set up
* grabAttributes<boolean> => clone option attributes to coresponding li
* triggerOpt<number> => trigger the option select of your choice upon instantiation
* skipFirst<boolean> => skip first option

**new SelectWrapper([list]).init();**
