// got these emojis from https://gist.github.com/eniraa/d49dce3ba1193d535aaa6d6a7660098a

const SmilyWithEyesOpenEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <path
      fill={front ? front : "#FFCC4D"}
      d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
      color="currentColor"
    />
    <ellipse
      cx={11.5}
      cy={12.5}
      fill={back ? back : "#664500"}
      rx={2.5}
      ry={5.5}
    />
    <ellipse
      cx={24.5}
      cy={12.5}
      fill={back ? back : "#664500"}
      rx={2.5}
      ry={5.5}
    />
    <path
      fill={back ? back : "#664500"}
      d="M18 22c-3.623 0-6.027-.422-9-1-.679-.131-2 0-2 2 0 4 4.595 9 11 9 6.404 0 11-5 11-9 0-2-1.321-2.132-2-2-2.973.578-5.377 1-9 1z"
    />
    <path
      fill={back ? back : "#664500"}
      d="M9 23s3 1 9 1 9-1 9-1-2 4-9 4-9-4-9-4z"
    />
  </svg>
);

const SmilyWithEyesClosedEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <path
      fill={front ? front : "#FFCC4D"}
      d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
    />
    <path
      fill={back ? back : "#664500"}
      d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297-2.957 0-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902 2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604zm-12 0c-.06-.135-1.499-3.297-4.457-3.297-2.957 0-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604zM18 22c-3.623 0-6.027-.422-9-1-.679-.131-2 0-2 2 0 4 4.595 9 11 9 6.404 0 11-5 11-9 0-2-1.321-2.132-2-2-2.973.578-5.377 1-9 1z"
    />
    <path
      fill={front ? front : "#FFF"}
      d="M9 23s3 1 9 1 9-1 9-1-2 4-9 4-9-4-9-4z"
    />
  </svg>
);

const SmilyWithEyesClosedEmojiV2 = ({
  front = "",
  back = "",
  ...delegated
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <path
      fill={front ? front : "#FFCC4D"}
      d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
    />
    <path
      fill={back ? back : "#FFCC4D"}
      d="M18 22c-3.623 0-6.027-.422-9-1-.679-.131-2 0-2 2 0 4 4.595 9 11 9 6.404 0 11-5 11-9 0-2-1.321-2.132-2-2-2.973.578-5.377 1-9 1z"
    />
    <path fill="#FFF" d="M9 23s3 1 9 1 9-1 9-1-2 4-9 4-9-4-9-4z" />
    <path
      fill={back ? back : "#664500"}
      d="M30.6 18.2c-.114-.085-1.931-1.426-4.646-2.344.026-.115.046-.233.046-.356 0-.369-.139-.703-.359-.964A13.866 13.866 0 0 1 29.002 14 1 1 0 0 0 29 12c-.221 0-5.451.038-8.707 3.293A1 1 0 0 0 21 17c4.59 0 8.363 2.772 8.401 2.801a1.003 1.003 0 0 0 1.4-.202A1 1 0 0 0 30.6 18.2zm-14.893-2.907C12.452 12.038 7.221 12 7 12a1.001 1.001 0 0 0-.001 2c.026 0 1.558.016 3.361.536-.221.261-.36.595-.36.964 0 .123.019.241.047.356-2.716.918-4.533 2.259-4.647 2.344a.999.999 0 1 0 1.2 1.6c.037-.028 3.787-2.8 8.4-2.8a1.002 1.002 0 0 0 .707-1.707z"
    />
  </svg>
);

const BlessedSmilyEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <circle cx={18} cy={18} r={18} fill={front ? front : "#FFCC4D"} />
    <path
      fill={back ? back : "#664500"}
      d="M27.335 22.629a.501.501 0 0 0-.635-.029c-.039.029-3.922 2.9-8.7 2.9-4.766 0-8.662-2.871-8.7-2.9a.5.5 0 0 0-.729.657C8.7 23.472 11.788 28.5 18 28.5s9.301-5.028 9.429-5.243a.499.499 0 0 0-.094-.628zM26 19a.999.999 0 0 1-.948-.684C24.849 17.717 24.033 16 23 16c-1.062 0-1.889 1.827-2.052 2.316a1 1 0 1 1-1.897-.633C19.177 17.307 20.355 14 23 14s3.823 3.307 3.948 3.684A1 1 0 0 1 26 19zm-10 0c-.419 0-.809-.265-.949-.684C14.848 17.717 14.034 16 13 16c-1.062 0-1.888 1.827-2.051 2.316a.999.999 0 1 1-1.897-.633C9.177 17.307 10.355 14 13 14s3.823 3.307 3.949 3.684A1 1 0 0 1 16 19z"
    />
    <path
      fill={back ? back : "#FFAC33"}
      d="M33.175 8.316s-9.042.161-15.175.161c-3.905 0-15.206-.118-15.206-.118l-.521.876c3.043 1.856 9.064 2.917 15.727 2.917 6.596 0 12.576-1.04 15.652-2.86l.078-.047s-.374-.664-.555-.929z"
    />
    <path
      fill={back ? back : "#5DADEC"}
      d="M23.777.345a70.63 70.63 0 0 0-3.773-.19A82.683 82.683 0 0 0 18 .129c-.672 0-1.336.01-1.993.025a70.732 70.732 0 0 0-3.777.19C5.34.88.169 2.451.169 5.287c0 3.588 8.264 5.771 17.831 5.771s17.831-2.183 17.831-5.771c0-2.835-5.168-4.405-12.054-4.942zM18 7.383c-6.861 0-12.91-.833-12.91-2.736 0-.536.494-1.023 1.339-1.449 1.153-.581 2.978-1.044 5.189-1.349 1.911-.262 4.098-.41 6.382-.41 2.291 0 4.485.148 6.4.413 2.242.31 4.086.783 5.232 1.377.807.418 1.278.894 1.278 1.418 0 1.903-6.049 2.736-12.91 2.736z"
    />
    <path
      fill={back ? back : "#3B94D9"}
      d="M24.4 1.853c2.242.31 4.086.783 5.232 1.377l.062.017c-2.285-1.674-4.57-2.56-5.917-2.902a70.63 70.63 0 0 0-3.773-.19l.018.007L24.4 1.853zM6.429 3.199c1.153-.581 2.978-1.044 5.189-1.349L15.984.162l.023-.008a70.732 70.732 0 0 0-3.777.19c-1.347.342-3.633 1.227-5.919 2.902l.118-.047z"
    />
    <path
      fill={back ? back : "#FFCC4D"}
      d="M28.472 3.375c-.66-.443-1.346-.91-2.001-1.26A17.907 17.907 0 0 0 18 0c-2.929 0-5.695.7-8.14 1.941-1.089.553-1.881.999-2.17 1.434h20.782z"
    />
  </svg>
);

const WinkSmilyEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <path
      fill={front ? front : "#FFCC4D"}
      d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
    />
    <ellipse
      cx={11.5}
      cy={16.5}
      fill={back ? back : "#664500"}
      rx={2.5}
      ry={3.5}
    />
    <path
      fill={back ? back : "#664500"}
      d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297-2.957 0-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902 2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604zM5.999 12.458a1 1 0 0 1-.799-1.6c3.262-4.35 7.616-4.4 7.8-4.4a1 1 0 0 1 .004 2c-.156.002-3.569.086-6.205 3.6a.995.995 0 0 1-.8.4zm23.002 2.125a.998.998 0 0 1-.801-.4c-2.592-3.457-6.961-2.627-7.004-2.62a1 1 0 0 1-.393-1.961c.231-.047 5.657-1.072 8.996 3.38a1 1 0 0 1-.798 1.601zm-5.747 8.994a.513.513 0 0 0-.597.06c-.01.008-1.013.863-4.657.863-3.641 0-4.646-.854-4.646-.854a.5.5 0 0 0-.838.475c.01.044 1.144 4.379 5.484 4.379s5.474-4.335 5.485-4.379a.497.497 0 0 0-.231-.544z"
    />
  </svg>
);

const SmilyWithGlassesEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <path
      fill={front ? front : "#FFCC4D"}
      d="M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18"
    />
    <path
      fill={back ? back : "#292F33"}
      fillRule="evenodd"
      d="M1.24 11.018c.24.239 1.438.957 1.677 1.675.24.717.72 4.784 2.158 5.981 1.483 1.232 7.077.774 8.148.24 2.397-1.195 2.691-4.531 3.115-6.221.239-.957 1.677-.957 1.677-.957s1.438 0 1.678.956c.424 1.691.72 5.027 3.115 6.221 1.072.535 6.666.994 8.151-.238 1.436-1.197 1.915-5.264 2.155-5.982.238-.717 1.438-1.435 1.677-1.674.241-.239.241-1.196 0-1.436-.479-.478-6.134-.904-12.223-.239-1.215.133-1.677.478-4.554.478-2.875 0-3.339-.346-4.553-.478-6.085-.666-11.741-.24-12.221.238-.239.239-.239 1.197 0 1.436z"
      clipRule="evenodd"
    />
    <path
      fill={back ? back : "#664500"}
      d="M27.335 23.629a.501.501 0 0 0-.635-.029c-.039.029-3.922 2.9-8.7 2.9-4.766 0-8.662-2.871-8.7-2.9a.5.5 0 0 0-.729.657C8.7 24.472 11.788 29.5 18 29.5s9.301-5.028 9.429-5.243a.499.499 0 0 0-.094-.628z"
    />
  </svg>
);

const SmilyWithHeartKissEmoji = ({ front = "", back = "", ...delegated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...delegated}>
    <circle cx={18} cy={18} r={18} fill={front ? front : "#FFCC4D"} />
    <ellipse
      cx={11.5}
      cy={15.5}
      fill={back ? back : "#664500"}
      rx={2.5}
      ry={3.5}
    />
    <path
      fill={back ? back : "#664500"}
      d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297-2.957 0-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902 2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604zM5.999 11A1 1 0 0 1 5.2 9.4C8.462 5.05 12.816 5 13 5a1 1 0 0 1 .004 2c-.155.002-3.568.086-6.204 3.6a.998.998 0 0 1-.801.4zm23.002 3a.998.998 0 0 1-.801-.4c-2.592-3.456-6.961-2.628-7.004-2.62a.998.998 0 0 1-1.177-.784 1.001 1.001 0 0 1 .784-1.177c.231-.047 5.657-1.072 8.996 3.38A1 1 0 0 1 29.001 14zm-8.922 13.042c1.335-.412 2.629-1.156 2.629-2.5 0-2.619-4.912-2.968-5.472-2.999a.493.493 0 0 0-.527.468.5.5 0 0 0 .464.53c.035.002 3.535.299 3.535 2.001s-3.5 1.999-3.535 2.001c-.014.001-.024.009-.037.011a.445.445 0 0 0-.146.04l-.019.011a.471.471 0 0 0-.125.098c-.014.015-.024.031-.036.048a.446.446 0 0 0-.059.102c-.012.029-.018.061-.024.092-.004.023-.016.044-.018.067 0 .011.004.021.004.031s-.005.021-.004.031c.001.024.013.045.018.068.006.031.011.061.023.09.013.03.031.057.049.084.017.024.032.05.052.071.023.023.05.041.078.061.024.017.046.034.074.047a.387.387 0 0 0 .101.027c.024.006.044.018.069.02.035.002 3.535.299 3.535 2.001s-3.5 1.999-3.535 2.001a.501.501 0 0 0 .035.999l.028-.001c.56-.031 5.472-.38 5.472-2.999 0-1.345-1.294-2.089-2.629-2.501z"
    />
    <path
      fill={back ? back : "#FFAC33"}
      d="M34.202 25.803a3.034 3.034 0 0 0-1.578-1.875 3.054 3.054 0 0 0-2.793.06 3.051 3.051 0 0 0-1.67-2.237 3.057 3.057 0 0 0-4.087 1.406c-.105.215-.18.437-.23.659-.775 2.556.64 6.341 2.192 7.948 1.23.13 2.953-.198 4.513-.873a18.035 18.035 0 0 0 3.653-5.088z"
    />
    <path
      fill={back ? back : "#DD2E44"}
      d="M35.654 27.222a3.054 3.054 0 0 0-4.198-4.026 3.051 3.051 0 0 0-1.67-2.237 3.058 3.058 0 0 0-4.087 1.406c-.105.215-.18.437-.23.659-.774 2.556.64 6.341 2.192 7.948 2.223.234 6.077-.979 7.615-3.161.145-.179.273-.374.378-.589z"
    />
  </svg>
);

export {
  SmilyWithEyesClosedEmoji,
  SmilyWithEyesClosedEmojiV2,
  SmilyWithEyesOpenEmoji,
  SmilyWithGlassesEmoji,
  SmilyWithHeartKissEmoji,
  WinkSmilyEmoji,
  BlessedSmilyEmoji,
};
