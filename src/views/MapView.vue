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
        }
    },
    created: function () {
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
            let map = new Microsoft.Maps.Map('#localMap', {
                credentials: 'Aoqy2mXrSBghBTiA1u_uB6zmWqcHfdVJn4Jq7M7l87XgYlA7I0ZLSH5AlR19LzdY'
            });
            Microsoft.Maps.Events.addHandler(map, 'click', _this.getClickLocation);
        },
        getClickLocation(e) {
            //若点击到地图的标记上，而非地图上
            let [_this, loc] = [this, null];
            if (e.targetType == 'pushpin') {
                loc = e.target.getLocation();
            }
            //若点击到地图上
            else {
                var point = new Microsoft.Maps.Point(e.pageX, e.pageY);
                loc = e.target.tryPixelToLocation(point, Microsoft.Maps.PixelReference.page);
            }
            console.log(loc.latitude + ", " + loc.longitude);
            console.log(loc);
            _this.lngNum = loc.longitude;
            _this.latNum = loc.latitude;
            let data = {
                lngNum: _this.lngNum,
                latNum: _this.latNum
            }
            this.$emit('getLocationNums', data);
        },
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