<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-container class="body-container">
            <el-aside width="200px">
                <BaseSide></BaseSide>
            </el-aside>
            <el-main>
                <!-- bing map component -->
                <div id="localMap"></div>
                <!-- operating panel -->
                <el-card class="box-card">
                    <div class="block item">
                        <h1 class="demonstration">Date pisker</h1>
                        <div class="demonstration">Value：{{ datetime }}</div>
                        <el-date-picker v-model="datetime" type="datetime" placeholder="Pick a Date"
                            format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD h:m:s a" />
                    </div>
                    <div class="item">
                        <h1>Selected Location:</h1>
                        <div>lngNum: {{ lngNum }}</div>
                        <div>latNum: {{ latNum }}</div>
                    </div>
                    <el-button class="item" @click="getPredictResult" type="primary">预测</el-button>
                    <div class="item">
                        <h1>Predict result:</h1>
                        <div>{{ predResult }}</div>
                    </div>

                    <el-button @click="testNav">navigate</el-button>
                    <el-button @click="clearNav">clearNav</el-button>
                    <div style="margin-top: 10px;" id="printoutPanel"></div>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import initBingMap from '~/api/initMap.js'

export default {
    data() {
        return {
            lngNum: null, // 经度
            latNum: null, // 纬度
            map: null,
            datetime: '',
            predResult: 1,
            directionsManager: null,
        }
    },
    mounted() {
        initBingMap.init()
            .then((Microsoft) => {
                console.log(Microsoft)
                console.log("加载成功...")
                this.initMap();
            })
    },
    methods: {
        initMap() {
            let _this = this;
            _this.map = new Microsoft.Maps.Map('#localMap', {
                credentials: 'Aoqy2mXrSBghBTiA1u_uB6zmWqcHfdVJn4Jq7M7l87XgYlA7I0ZLSH5AlR19LzdY',
                center: new Microsoft.Maps.Location(40.76737744930541, -73.98389818892902),
            });
            Microsoft.Maps.Events.addHandler(_this.map, 'click', _this.getClickLocation);
            Microsoft.Maps.Events.addHandler(_this.map, 'rightclick', _this.rightClickMark);
        },
        getClickLocation(e) {
            //若点击到地图的标记上，而非地图上
            console.log(e);
            let [_this, loc] = [this, null];
            if (e.targetType == 'pushpin') {
                loc = e.target.getLocation();
            }
            //若点击到地图上
            else {
                var point = new Microsoft.Maps.Point(e.pageX, e.pageY);
                loc = e.target.tryPixelToLocation(point, Microsoft.Maps.PixelReference.page);
            }
            console.log(loc);
            _this.lngNum = loc.longitude;
            _this.latNum = loc.latitude;
            let data = {
                lngNum: _this.lngNum,
                latNum: _this.latNum
            }
            this.$emit('getLocationNums', data);
        },
        rightClickMark(e) {
            console.log(e);
            let [_this, loc] = [this, null];
            if (e.targetType == 'pushpin') {
                loc = e.target.getLocation();
            }
            //若点击到地图上
            else {
                var point = new Microsoft.Maps.Point(e.pageX, e.pageY);
                loc = e.target.tryPixelToLocation(point, Microsoft.Maps.PixelReference.page);
            }
            //Add the pushpin to the map
            var pin = new Microsoft.Maps.Pushpin(loc, {
                // demo_1
                title: 'Microsoft', // 图钉的标题
                subTitle: 'City Center', // 图钉主体文字
                text: '1', // 图钉内的文字
                color: 'red', // 纯色图钉
            });
            _this.map.entities.push(pin);
        },
        getPredictResult() {
            console.log('predict');
        },
        testNav() {
            console.log('test');
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
                this.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(this.map);
                // Set Route Mode to driving
                this.directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
                var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ address: 'Redmond', location: new Microsoft.Maps.Location(47.67683029174805, -122.1099624633789) });
                var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle', location: new Microsoft.Maps.Location(47.59977722167969, -122.33458709716797) });
                this.directionsManager.addWaypoint(waypoint1);
                this.directionsManager.addWaypoint(waypoint2);
                // Set the element in which the itinerary will be rendered
                this.directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
                this.directionsManager.calculateDirections();
            });
        },
        clearNav() {
            this.directionsManager.clearDisplay();
            var allWaypoints = this.directionsManager.getAllWaypoints();
            var numberWaypoints = allWaypoints.length;
            document.getElementById('printoutPanel').innerHTML = numberWaypoints + ' waypoints in DirectionsManager';
        }
    }
}
</script>
<style scoped>
.ep-header {
    padding: 0;
}

.ep-main {
    display: flex;
    flex-direction: row;
}

#localMap {
    width: 60%;
}

.box-card {
    width: 40%;
    margin-left: 20px;
    border-radius: 10px;
}

.item {
    margin-bottom: 18px;
}

.demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-datetime-picker .block:last-child {
    border-right: none;
}

.demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>