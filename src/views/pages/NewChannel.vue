<view class="top_line"></view>
<view>
    <view class="add_item">
        <text class="item_text">订单号:</text>
        <text class="item_input">{{rforder}}</text>
    </view>
        <view class="add_item">
        <text class="item_text">退款退货原因:</text>
      <picker class="picker" bindchange="bindPickerChange" value="{{index}}" range="{{reasonList}}"  range-key="content">
        <view class="picker">
   
          {{reasonList[index].content}}
        </view>
  </picker>
    </view>
        <view class="add_item">
        <text class="item_text">上传凭证:</text>
        <view class="question-images-tool">
         <button type="default" size="mini" bindtap="chooseImage" wx:if="{{images.length < 5}}">选择图片</button>
</view>
   
        <view class="add_item">
        <text class="item_text">上传视频:</text>
    <view class="question-images-tool">    
    <button type="default" size="mini" bindtap="chooseVideo">选择视频</button>
    
     </view>
    </view>
    <view class="add_item">
          <textarea class="item_input" placeholder='请输入退款退货理由' bindinput='bindTextarea'></textarea>
    </view>
 
    <!-- 图片缩略图  -->
    <view class="question-images">
      <block wx:for="{{images}}" wx:key="*this">
        <view class="q-image-wrap">
          <image class="q-image" src="{{item}}" mode="aspectFill" data-idx="{{index}}" bindtap="handleImagePreview"></image>
          <view class="q-image-remover" data-idx="{{index}}" bindtap="removeImage">删除</view>
        </view>
      </block>
    </view>
    <view class="question-images">
      <video  src="{{refundVideo}}" controls></video>
    </view>
    <view class="add_address" bindtap="add">
        <view class="add">
            <text>保存</text>
        </view>
    </view>


</view> 