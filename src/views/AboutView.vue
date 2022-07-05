<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-main>
            <el-card>
                <div class="about">
                    <h1>This is an about page</h1>
                    <p>交通事故是造成交通拥堵和延误的主要原因；是造成人员伤亡、财产损失的重要原因；也是事关公共卫生和交通安全的重大问题。</p>
                    <p>本系统可以根据能见度、温度和天气类别等环境因素以及美国位置和星期几等因素来预测美国交通事故的严重程度。本系统实现对交通事故情况的预测并分类，能够告诉用户发生车祸的预测结果，根据这个结果，不同的用户采取不同的应对手段。可以在出行规划，风险评估，道路预警等相关领域提供有效的帮助。</p>
                </div>
                <div class="bottom">
                    <p>© 2022 λ project team</p>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>

</script>
<style scoped>
.ep-header {
    padding: 0;
}
.ep-main {
    display: flex;
    justify-content: center;
}
.ep-card{
    width: 800px;
}

</style>
