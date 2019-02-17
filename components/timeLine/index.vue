<template>
  <div class="timeline">
    <ul class="event_list">
      <div style="display: block;">
        <h3 id="2018">2018</h3>
        <li>
          <span>08-06</span>
          <p>
            <span>
              <a
                href="https://www.yezismile.com/detail/469.html"
                target="_blank"
                title="2018上半年，琐碎心情"
              >2018上半年，琐碎心情</a>
            </span>
          </p>
        </li>
        <li>
          <span>08-06</span>
          <p>
            <span>
              <a
                href="https://www.yezismile.com/detail/469.html"
                target="_blank"
                title="2018上半年，琐碎心情"
              >2018上半年，琐碎心情</a>
            </span>
          </p>
        </li>
      </div>
      <div style="display: block;">
        <h3 id="2018">2018</h3>
        <li>
          <span>08-06</span>
          <p>
            <span>
              <a
                href="https://www.yezismile.com/detail/469.html"
                target="_blank"
                title="2018上半年，琐碎心情"
              >2018上半年，琐碎心情</a>
            </span>
          </p>
        </li>
        <li>
          <span>08-06</span>
          <p>
            <span>
              <a
                href="https://www.yezismile.com/detail/469.html"
                target="_blank"
                title="2018上半年，琐碎心情"
              >2018上半年，琐碎心情</a>
            </span>
          </p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.event_list {
  width: 850px;
  float: right;
  background: url(../../assets/image/dian3.png) 139px 0 repeat-y;
  margin: 10px 0 20px 0;

  h3 {
    margin: 0 0 10px 132px;
    font-size: 24px;
    font-family: Georgia;
    color: #db6d4c;
    padding-left: 25px;
    background: url(../../assets/image/jian.png) 0 -45px no-repeat;
    height: 38px;
    line-height: 30px;
    font-style: italic;
  }

  li {
    background: url(../../assets/image/jian.png) 136px -80px no-repeat;

    span {
      width: 127px;
      text-align: right;
      display: block;
      float: left;
      margin-top: 10px;
    }

    p {
      width: 680px;
      margin-left: 24px;
      display: inline-block;
      padding-left: 10px;
      background: url(../../assets/image/jian.png) -21px 0 no-repeat;
      line-height: 25px;

      span {
        width: 650px;
        text-align: left;
        border-bottom: 2px solid #ddd;
        padding: 10px 15px;
        background: #fff;
        margin: 0;
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: #666;
      }
    }
  }
}
</style>
