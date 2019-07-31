// const db = wx.cloud.database()
// const Schema = mongoose.Schema;

// const ActivitySchema = new Schema({
//   activeId: { type: String }, // 活动id
//   activeImg: { type: String }, // 活动图片
//   activeTitle: { type: String }, // 活动主题
//   activeSubTitle: { type: String }, // 活动副标题
//   activeState: { type: String }, // 活动状态
//   activeSignUpStartTime: { type: Date }, // 活动报名开始时间
//   activeSignUpEndTime: { type: Date }, // 活动报名结束时间
//   activeStartTime: { type: Date }, // 活动开始时间
//   activeEndTime: { type: Date }, // 活动开始时间
//   activeAddress: { type: String }, // 活动地点
//   activeContent: { type: String }, // 活动内容【富文本】
//   create_at: { type: Date, default: Date.now },
//   update_at: { type: Date, default: Date.now },
// });

// ActivitySchema.index({ activeId: 1 }, { unique: true });

// ActivitySchema.pre('save', function (next) {
//   const now = new Date();
//   this.update_at = now;
//   next();
// });

// let Address = {
//     //addressName,addressPersonName,addressPhone,openId
//     addressName: 
// }

let Address = class {
    constructor(addressName, addressPersonName, addressPhone, openId) {
        this.addressName = addressName;
        this.addressPersonName = addressPersonName;
        this.addressPhone = addressPhone;
        this.openId = openId;
        this.initModel();
    }
    initModel(){
        this.dbModel = {
            addressName: this.addressName,
            addressPersonName: this.addressPersonName,
            addressPhone: this.addressPhone,
            openId: this.openId
        }
    }

    get dbModel(){
        return this._dbModel;
    }
    set dbModel(model) {
        this._dbModel = model;
    }
};

 
module.exports = Address;