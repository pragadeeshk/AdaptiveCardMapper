# Adaptive Cards Mapper

## Introduction

Adaptive cards mapper is built to make it easier for any back-end developer to bind dynamic API JSON data responses from webservice or database to adaptive card structure.

## Motivation

Currently adaptive cards are built using [Adaptive Cards Designer](https://adaptivecards.io/designer/) tool. The designed adaptive card structure can be exported from the tool and rendered by adaptive cards SDKs available in multiple client platforms.

As of Adaptive cards version 1.2, there is no direct way to bind dynamic data with the adaptive cards. Developers have to manually parse and map the data and card. It is a tedious,, time consuming and error prone task. Also, change in data or adaptive card structure need rewriting the mapping logic.

To eliminate/minimize this effort by the developer, AdaptiveCardMapper is created. This allows the developer to input the adaptive card structure and data schema, map the variables with a point-and-click UI and export the mapped schema to the back-end.

## How it works

* Design the adaptive card using [Adaptive Cards Designer](https://adaptivecards.io/designer/) tool.

![](images/designer.png)

* Provide appropriate ID for elements that will hold dynamic contents

![](images/enterID.png)

* Click "Copy JSON" in the tool bar.

* Open AdaptiveCardMapper tool

![](images/mapper.png)

* Paste Adaptive card json from designer into first text box and Click Submit to list all the variables in the adaptive card json

![](images/ids.png)

* Paste content JSON schema in second text box and click submit to display the JSON Tree.

![](images/tree.png)

* Click on anyone of the variable in left pane.

* Click on appropriate data field from the JSON tree that will be associated to the selected variable.

![](images/tagging.gif)

* Map values to all variables.

![](images/tagged-full.png)

* Click verify to display the actual adaptive card bound with data.

![](images/render.png)

* Click Finish if the rendered adaptive card looks fine.

* Copy JSON from the dialog.

![](images/final.png)

## Back-end Integration

