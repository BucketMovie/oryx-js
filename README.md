Oryx-JS
=======

![travis status](https://travis-ci.org/BucketMovie/oryx-js.svg?branch=master)

Basic module to communicate with [Oryx](https://github.com/cloudera/oryx).

Installation & configuration
----------------------------

### Install Oryx

See the [Oryx doc](https://github.com/cloudera/oryx/wiki/Installation) for installation, you can get releases [here](https://github.com/cloudera/oryx/releases).

### Install the module

### Run your Oryx server and computation instances

Create a file called `oryx.conf` with the following informations : 

```
model=${als-model}
model.local-computation=false
model.local-data=false
model.instance-dir=/user/name/repo
model.features=25
model.lambda=0.065
serving-layer.api.port=8091
computation-layer.api.port=8092
```

And run the jars with the following lines : 

```
java -Dconfig.file=oryx.conf -jar oryx-computation-x.y.z.jar
java -Dconfig.file=oryx.conf -jar oryx-serving-x.y.z.jar
```


### Usage

```
var OryxService = require('oryx-js')({
    host: 'localhost',
    port: '8091',
    user: user,
    password: pwd
});
```

Functions
---------

### Recommendation

#### get

Parameters

* int user_id
* int count
* func callback(err, res, body)

#### getToMany

Parameters

* [int] user_ids
* int count
* func callback(err, res, body)

#### getForAnonymous

Parameters

* [{ id: int, val: float }] score_params
* int count
* func callback(err, res, body)

#### getBecause

Parameters

* int user_id
* int item_id
* int count
* func callback(err, res, body)

#### getMostPopular

Parameters

* int count
* func callback(err, res, body)

### Similiraty

#### get

Parameters

* [int] item_ids
* int count

#### getToItem

Parameters

* int main_item_id
* [int] item_ids
* func callback(err, res, body)

### Estimation

#### get

Parameters

* int user_id
* [int] item_ids
* func callback(err, res, body)

#### getForAnonymous

Parameters

Parameters

* int item_id
* [{ id: int, val: float }] score_params
* func callback(err, res, body)

### Preferences

#### set

Parameters 

* int user_id
* int item_id
* float value
* [func callback(err, res, body)]

#### delete

Parameters

* int user_id
* int item_id
* [func callback(err, res, body)]

### Basic

#### ready

Parameters 

* func callback(err, res, body)

#### refresh

Parameters 

* [func callback(err, res, body)]


#### ingest

Parameters

* data
* func callback(err, res, body)

DEVELOPMENT
------------

### Info
The code was developped and tested with *Oryx 0.3.0*

### TODO

#### Authentication

Handle authentication, none for now

#### Data format

For now, data is received only as a `csv` string, `json` should be included in Oryx' next version and support added to the bundle.
Also make the module parse the `csv` data before sending it to the callback.
