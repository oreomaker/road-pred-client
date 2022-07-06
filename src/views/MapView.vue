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
                <div id="localMap"></div>
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
        }
    },
    created() {
        let _this = this;
        initBingMap.init()
            .then((Microsoft) => {
                console.log(Microsoft)
                console.log("加载成功...")
                _this.initMap();
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
        }
    }
}
</script>
<style scoped>
.ep-header {
    padding: 0;
}

.map-container {
    width: 100%;
    height: 400px;
    border: 1px solid #000;
}
</style>