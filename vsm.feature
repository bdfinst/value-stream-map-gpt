Feature: I want to have a system written in React that will create a value stream map and calculate the best and worst case flow efficiencies.

Scenario: Adding a step.
When I press the "Create Step" button
Then a new step will be created
And I will be able to add information for "Process Time"
And I will be able to add information for "Wait Time"
And I will be able to add information for "Percent Complete and Accurate"
And I will be able to change the title
But the title will default to the step number

Scenario: Calculate values
Given there are one or more steps
And the steps have all information fields populated
Then a field will display the "Flow Efficiency" 
And the flow efficiency will be calculated using the formula of total process time / (total process time + total wait time) * 100

Scenario: First step
Given there are no steps
Then the first step will be added automatically

Scenario: Next step
Given there is at least one step
When I add a step
Then the next step will be displayed to the right of the previous step.

Scenario: Styling the components
When a step is created
Then the step will have a light blue Background
And the information fields will have a white Background
And the step corners will be radiused by 20%

Scenario: Reorder steps
Given there is more than one step
When I drag step 2 to the left of 1 
Then step 2 will become step 1 and step 1 will become step 2
But the inputs for each step will not change.
