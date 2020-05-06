@Sid
Feature: Test Automation

    Background:
        Given Navigate to Test URL

    Scenario: Verify User should be able to perfrom End to End Test

        When User updates the Provider to ECM
        And User click on Apply button
        And User navigate to the Login URL
        And User login to the application with user "guest@example.com" and password "Password"
        And User navigate to the Files URL
        And User clicks on create new folder icon
        Then User should see the New Folder Dialog
        When User inputs the github username "siddharthsid"
        Then The username should be inputted in the Name field
        When User clicks on create button
        Then The Create new folder Dialog should not be displayed
        And User should see the folder "created" for the inputed github username "siddharthsid"
        And User clicks on create new folder icon
        Then User should see the New Folder Dialog
        When User inputs the github username "siddharthsid"
        Then The username should be inputted in the Name field
        When User clicks on create button
        Then User should see the New Folder Dialog
        And User should see the validation error message
        When User click on the Cancel button
        And User selects the action button for created username "siddharthsid"
        And User click on delete button to delete the username
        Then User should see the folder "deleted" for the inputed github username "siddharthsid"