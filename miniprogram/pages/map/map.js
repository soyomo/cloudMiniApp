Component({
    data: {
        mapCtx: {},
        latitude: 1,
        longitude: 1,
        markers: [{
            id: 1,
            latitude: 1,
            longitude: 1,
            iconPath: "/images/location.png",
        }],
    },
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 1
                })
            }
        }
    },
    lifetimes: {
        created: function () {
            this.mapCtx = wx.createMapContext('myMap')
        },
        ready: function () {
            this.getCenterLocation()
        }
    },
    methods: {
        getCenterLocation: function () {
            const that = this
            this.mapCtx.getCenterLocation({
                success: function (res) {
                    that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                    console.log(that, '===')
                    that.moveToLocation()
                }
            })
        },
        moveToLocation: function () {
            this.mapCtx.moveToLocation()
            console.log(this.latitude)
            const that = this
            this.mapCtx.translateMarker({
                markerId: 1,
                autoRotate: true,
                duration: 100,
                destination: {
                    latitude: that.latitude,
                    longitude: that.longitude,
                },
                animationEnd() {
                    console.log('animation end')
                }
            })
        }
    }
})