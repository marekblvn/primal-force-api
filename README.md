# Primal Force API
## Endpoint documentation
### match/add
#### Input data
```javascript
{
    routingCode: String, // EUW1, EUN1, ... 
    //see https://developer.riotgames.com/docs/lol
    gameId: Number // LoL game Id
}
```

#### Output data
```javascript
{
    ...matchObject: Object // created match object
}
```

### match/get

#### Input data
```javascript
url: ".../api/match/get/?id="..."
```


#### Output data
```javascript
{
    ...matchObject: Object // matched match object
}
```

### match/list
#### Input data
```javascript
url: ".../api/match/list?summonerNameList=...,...&championNameList=...,...&pageIndex=0&pageSize=10"
```
#### Output data
```javascript
{
    itemList: [
        {
            id: ObjectId, // mongoId of match
            info: { // info object
                participants: [ // array of participants
                    {
                        championName: String, // champion name
                        summonerName: String, // summoner name
                        teamId: Number // team's id, either 100 or 200
                    }
                ]
            },
            teams: [ // array of teams
                {
                    bans: [ // array of ban objects
                        {
                            championId: Number, // id of champion banned
                            pickTurn: Number, // turn
                        },
                        ...
                    ],
                    objectives: { // objectives
                        baron: {
                            first: Boolean, // was this team the first to take this objective
                            kills: Number, // number of taken objectives of this type
                        },
                        champion: {...},
                        dragon: {...},
                        riftHerald: {...},
                        tower: {...},
                        inhibitor: {...},
                    },
                    teamId: Number, // team's id, either 100 or 200
                    win: Boolean // did this team win
                },
                ...
            ]
        },
        ...
    ],
    pageInfo: {
        pageIndex: Number, // index of this page
        pageSize: Number, // size of page
        total: Number, // total number of documents
    }
}
```

### match/delete

#### Input data
```javascript
{
    id: ObjectId // object id of match document
}
```

#### Output data
```javascript
{
	acknowledged: Boolean, // did operation come through?
	deletedCount: Number // number of deleted documents
}
```
