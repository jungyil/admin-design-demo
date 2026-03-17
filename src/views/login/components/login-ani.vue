<template>
  <div class="login-ani">
    <div class="login-ani__content">
      <div ref="charactersRef" class="login-ani__characters">
        <div
          ref="purpleRef"
          class="character character--purple"
          :class="{ 'character--peek': isPurplePeeking }"
          :style="purpleStyle"
        >
          <div class="character__eyes" :style="purpleEyesStyle">
            <div class="eye-wrapper">
              <div
                class="eyeball"
                :class="{ 'eyeball--blink': isPurpleBlinking }"
                :style="getEyeBallStyle(18)"
              >
                <div
                  class="pupil"
                  :style="getPupilStyle(7, purpleForceLookX, purpleForceLookY)"
                />
              </div>
            </div>
            <div class="eye-wrapper">
              <div
                class="eyeball"
                :class="{ 'eyeball--blink': isPurpleBlinking }"
                :style="getEyeBallStyle(18)"
              >
                <div
                  class="pupil"
                  :style="getPupilStyle(7, purpleForceLookX, purpleForceLookY)"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref="blackRef"
          class="character character--black"
          :style="blackStyle"
        >
          <div class="character__eyes" :style="blackEyesStyle">
            <div class="eye-wrapper">
              <div
                class="eyeball"
                :class="{ 'eyeball--blink': isBlackBlinking }"
                :style="getEyeBallStyle(16)"
              >
                <div
                  class="pupil"
                  :style="getPupilStyle(6, blackForceLookX, blackForceLookY)"
                />
              </div>
            </div>
            <div class="eye-wrapper">
              <div
                class="eyeball"
                :class="{ 'eyeball--blink': isBlackBlinking }"
                :style="getEyeBallStyle(16)"
              >
                <div
                  class="pupil"
                  :style="getPupilStyle(6, blackForceLookX, blackForceLookY)"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref="orangeRef"
          class="character character--orange"
          :style="orangeStyle"
        >
          <div
            class="character__eyes character__eyes--pupil"
            :style="orangeEyesStyle"
          >
            <div
              class="pupil--solo"
              :style="getSoloPupilStyle(12, orangeForceLookX, orangeForceLookY)"
            />
            <div
              class="pupil--solo"
              :style="getSoloPupilStyle(12, orangeForceLookX, orangeForceLookY)"
            />
          </div>
        </div>

        <div
          ref="yellowRef"
          class="character character--yellow"
          :style="yellowStyle"
        >
          <div
            class="character__eyes character__eyes--pupil"
            :style="yellowEyesStyle"
          >
            <div
              class="pupil--solo"
              :style="getSoloPupilStyle(12, yellowForceLookX, yellowForceLookY)"
            />
            <div
              class="pupil--solo"
              :style="getSoloPupilStyle(12, yellowForceLookX, yellowForceLookY)"
            />
          </div>
          <div class="character__mouth" :style="yellowMouthStyle" />
        </div>
      </div>

      <div class="login-ani__grid" />
      <div class="login-ani__blur login-ani__blur--1" />
      <div class="login-ani__blur login-ani__blur--2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';

  const charactersRef = ref<HTMLElement | null>(null);
  const purpleRef = ref<HTMLElement | null>(null);
  const blackRef = ref<HTMLElement | null>(null);
  const orangeRef = ref<HTMLElement | null>(null);
  const yellowRef = ref<HTMLElement | null>(null);

  const mouseState = reactive({ x: 0, y: 0 });
  const isPurpleBlinking = ref(false);
  const isBlackBlinking = ref(false);
  const isLookingAtEachOther = ref(false);
  const isPurplePeeking = ref(false);
  const isTyping = ref(false);
  const showPassword = ref(false);
  const passwordLength = ref(0);

  const pupilPositions = reactive({
    purpleLeft: { x: 0, y: 0 },
    purpleRight: { x: 0, y: 0 },
    blackLeft: { x: 0, y: 0 },
    blackRight: { x: 0, y: 0 },
    orangeLeft: { x: 0, y: 0 },
    orangeRight: { x: 0, y: 0 },
    yellowLeft: { x: 0, y: 0 },
    yellowRight: { x: 0, y: 0 },
  });

  const updatePupilPositions = () => {
    const updateForElement = (
      refEl: HTMLElement | null,
      offsetX: number,
      offsetY: number,
      maxDist: number,
      posKey:
        | 'purpleLeft'
        | 'purpleRight'
        | 'blackLeft'
        | 'blackRight'
        | 'orangeLeft'
        | 'orangeRight'
        | 'yellowLeft'
        | 'yellowRight'
    ) => {
      if (!refEl) return;
      const rect = refEl.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2 + offsetX;
      const eyeCenterY = rect.top + rect.height / 2 + offsetY;

      const deltaX = mouseState.x - eyeCenterX;
      const deltaY = mouseState.y - eyeCenterY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDist);

      const angle = Math.atan2(deltaY, deltaX);
      pupilPositions[posKey] = {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    };

    if (purpleRef.value) {
      updateForElement(purpleRef.value, -60, -15, 5, 'purpleLeft');
      updateForElement(purpleRef.value, -28, -15, 5, 'purpleRight');
    }
    if (blackRef.value) {
      updateForElement(blackRef.value, -42, -10, 4, 'blackLeft');
      updateForElement(blackRef.value, -18, -10, 4, 'blackRight');
    }
    if (orangeRef.value) {
      updateForElement(orangeRef.value, -25, 0, 5, 'orangeLeft');
      updateForElement(orangeRef.value, 7, 0, 5, 'orangeRight');
    }
    if (yellowRef.value) {
      updateForElement(yellowRef.value, -30, -10, 5, 'yellowLeft');
      updateForElement(yellowRef.value, -6, -10, 5, 'yellowRight');
    }
  };

  const updateMouse = (e: MouseEvent) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
    updatePupilPositions();
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse);

    const schedulePurpleBlink = () => {
      const delay = Math.random() * 4000 + 3000;
      setTimeout(() => {
        isPurpleBlinking.value = true;
        setTimeout(() => {
          isPurpleBlinking.value = false;
          schedulePurpleBlink();
        }, 150);
      }, delay);
    };
    schedulePurpleBlink();

    const scheduleBlackBlink = () => {
      const delay = Math.random() * 4000 + 3000;
      setTimeout(() => {
        isBlackBlinking.value = true;
        setTimeout(() => {
          isBlackBlinking.value = false;
          scheduleBlackBlink();
        }, 150);
      }, delay);
    };
    scheduleBlackBlink();
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse);
  });

  const calculatePosition = (refEl: HTMLElement | null) => {
    if (!refEl) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = refEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseState.x - centerX;
    const deltaY = mouseState.y - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = computed(() => calculatePosition(purpleRef.value));
  const blackPos = computed(() => calculatePosition(blackRef.value));
  const orangePos = computed(() => calculatePosition(orangeRef.value));
  const yellowPos = computed(() => calculatePosition(yellowRef.value));

  const isHidingPassword = computed(
    () => passwordLength.value > 0 && !showPassword.value
  );

  const getEyeBallStyle = (size: number) => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: 'white',
  });

  const getPupilStyle = (size: number, forceX?: number, forceY?: number) => {
    let x = 0;
    let y = 0;
    if (forceX !== undefined && forceY !== undefined) {
      x = forceX;
      y = forceY;
    }
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#2D2D2D',
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  const getSoloPupilStyle = (
    size: number,
    forceX?: number,
    forceY?: number
  ) => {
    let x = 0;
    let y = 0;
    if (forceX !== undefined && forceY !== undefined) {
      x = forceX;
      y = forceY;
    }
    return {
      'width': `${size}px`,
      'height': `${size}px`,
      'backgroundColor': '#2D2D2D',
      'transform': `translate(${x}px, ${y}px)`,
      'border-radius': '50%',
    };
  };

  const purpleStyle = computed(() => {
    const pos = purplePos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;
    let transform = '';

    if (isPeeking) {
      transform = 'skewX(0deg)';
    } else if (isTyping.value || isHidingPassword.value) {
      transform = `skewX(${pos.bodySkew - 12}deg) translateX(40px)`;
    } else {
      transform = `skewX(${pos.bodySkew}deg)`;
    }

    return {
      width: '180px',
      height: isTyping.value || isHidingPassword.value ? '440px' : '400px',
      backgroundColor: '#6C3FF5',
      borderRadius: '10px 10px 0 0',
      transform,
      transformOrigin: 'bottom center',
      transition: 'all 0.7s ease-in-out',
    };
  });

  const purpleEyesStyle = computed(() => {
    const pos = purplePos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    if (isPeeking) {
      return { left: '20px', top: '35px', gap: '32px' };
    }
    if (isLookingAtEachOther.value) {
      return { left: '55px', top: '65px', gap: '32px' };
    }
    return {
      left: `${45 + pos.faceX}px`,
      top: `${40 + pos.faceY}px`,
      gap: '32px',
    };
  });

  const isLookingAway = ref(false);

  const purpleForceLookX = computed(() => {
    if (isLookingAway.value) return -4;
    if (passwordLength.value > 0 && showPassword.value) {
      return isPurplePeeking.value ? 4 : -4;
    }
    if (isLookingAtEachOther.value) return 3;
    return undefined;
  });

  const purpleForceLookY = computed(() => {
    if (isLookingAway.value) return 4;
    if (passwordLength.value > 0 && showPassword.value) {
      return isPurplePeeking.value ? 5 : -4;
    }
    if (isLookingAtEachOther.value) return 4;
    return undefined;
  });

  const blackStyle = computed(() => {
    const pos = blackPos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;
    let transform = '';

    if (isPeeking) {
      transform = 'skewX(0deg)';
    } else if (isLookingAtEachOther.value) {
      transform = `skewX(${pos.bodySkew * 1.5 + 10}deg) translateX(20px)`;
    } else if (isTyping.value || isHidingPassword.value) {
      transform = `skewX(${pos.bodySkew * 1.5}deg)`;
    } else {
      transform = `skewX(${pos.bodySkew}deg)`;
    }

    return {
      left: '240px',
      width: '120px',
      height: '310px',
      backgroundColor: '#2D2D2D',
      borderRadius: '8px 8px 0 0',
      transform,
      transformOrigin: 'bottom center',
      transition: 'all 0.7s ease-in-out',
    };
  });

  const blackEyesStyle = computed(() => {
    const pos = blackPos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    if (isPeeking) {
      return { left: '10px', top: '28px', gap: '24px' };
    }
    if (isLookingAtEachOther.value) {
      return { left: '32px', top: '12px', gap: '24px' };
    }
    return {
      left: `${26 + pos.faceX}px`,
      top: `${32 + pos.faceY}px`,
      gap: '24px',
    };
  });

  const blackForceLookX = computed(() => {
    if (isLookingAway.value) return -4;
    if (passwordLength.value > 0 && showPassword.value) return -4;
    if (isLookingAtEachOther.value) return 0;
    return undefined;
  });

  const blackForceLookY = computed(() => {
    if (isLookingAway.value) return 4;
    if (passwordLength.value > 0 && showPassword.value) return -4;
    if (isLookingAtEachOther.value) return -4;
    return undefined;
  });

  const orangeStyle = computed(() => {
    const pos = orangePos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    return {
      left: '0px',
      width: '240px',
      height: '200px',
      backgroundColor: '#FF9B6B',
      borderRadius: '120px 120px 0 0',
      transform: isPeeking ? 'skewX(0deg)' : `skewX(${pos.bodySkew}deg)`,
      transformOrigin: 'bottom center',
      transition: 'all 0.7s ease-in-out',
    };
  });

  const orangeEyesStyle = computed(() => {
    const pos = orangePos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    if (isPeeking) {
      return { left: '50px', top: '85px', gap: '32px' };
    }
    return {
      left: `${82 + pos.faceX}px`,
      top: `${90 + pos.faceY}px`,
      gap: '32px',
    };
  });

  const orangeForceLookX = computed(() => {
    if (isLookingAway.value) return -5;
    if (passwordLength.value > 0 && showPassword.value) return -5;
    return undefined;
  });

  const orangeForceLookY = computed(() => {
    if (isLookingAway.value) return 4;
    if (passwordLength.value > 0 && showPassword.value) return -4;
    return undefined;
  });

  const yellowStyle = computed(() => {
    const pos = yellowPos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    return {
      left: '310px',
      width: '140px',
      height: '230px',
      backgroundColor: '#E8D754',
      borderRadius: '70px 70px 0 0',
      transform: isPeeking ? 'skewX(0deg)' : `skewX(${pos.bodySkew}deg)`,
      transformOrigin: 'bottom center',
      transition: 'all 0.7s ease-in-out',
    };
  });

  const yellowEyesStyle = computed(() => {
    const pos = yellowPos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    if (isPeeking) {
      return { left: '20px', top: '35px', gap: '24px' };
    }
    return {
      left: `${52 + pos.faceX}px`,
      top: `${40 + pos.faceY}px`,
      gap: '24px',
    };
  });

  const yellowMouthStyle = computed(() => {
    const pos = yellowPos.value;
    const isPeeking = passwordLength.value > 0 && showPassword.value;

    if (isPeeking) {
      return { left: '10px', top: '88px' };
    }
    return {
      left: `${40 + pos.faceX}px`,
      top: `${88 + pos.faceY}px`,
    };
  });

  const yellowForceLookX = computed(() => {
    if (isLookingAway.value) return -5;
    if (passwordLength.value > 0 && showPassword.value) return -5;
    return undefined;
  });

  const yellowForceLookY = computed(() => {
    if (isLookingAway.value) return 4;
    if (passwordLength.value > 0 && showPassword.value) return -4;
    return undefined;
  });

  const setTyping = (value: boolean) => {
    isTyping.value = value;
    if (value) {
      isLookingAtEachOther.value = true;
      setTimeout(() => {
        isLookingAtEachOther.value = false;
      }, 800);
    }
  };

  const setShowPassword = (value: boolean) => {
    showPassword.value = value;
    if (value) {
      isLookingAway.value = true;
      if (passwordLength.value > 0) {
        const schedulePeek = () => {
          const delay = Math.random() * 3000 + 2000;
          setTimeout(() => {
            isPurplePeeking.value = true;
            setTimeout(() => {
              isPurplePeeking.value = false;
              if (showPassword.value && passwordLength.value > 0) {
                schedulePeek();
              }
            }, 800);
          }, delay);
        };
        schedulePeek();
      }
    } else {
      isLookingAway.value = false;
    }
  };

  const setPasswordLength = (value: number) => {
    passwordLength.value = value;
  };

  defineExpose({
    setTyping,
    setShowPassword,
    setPasswordLength,
  });
</script>

<style lang="less" scoped>
  .login-ani {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(163.85deg, #6b7280 0%, #9ca3af 100%);
    overflow: hidden;

    &__content {
      position: relative;
      width: 550px;
      height: 500px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    &__characters {
      position: relative;
      width: 550px;
      height: 400px;
      z-index: 10;
    }

    &__grid {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 1px
      );
      background-size: 20px 20px;
      pointer-events: none;
    }

    &__blur {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;

      &--1 {
        top: 25%;
        right: 25%;
        width: 256px;
        height: 256px;
        background-color: rgba(107, 114, 128, 0.2);
      }

      &--2 {
        bottom: 25%;
        left: 25%;
        width: 384px;
        height: 384px;
        background-color: rgba(156, 163, 175, 0.2);
      }
    }
  }

  .character {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;

    &--purple {
      left: 70px;
      z-index: 1;
    }

    &--black {
      left: 240px;
      z-index: 2;
    }

    &--orange {
      left: 0;
      z-index: 3;
    }

    &--yellow {
      left: 310px;
      z-index: 4;
    }

    &__eyes {
      position: absolute;
      display: flex;
      transition: all 0.2s ease-out;

      &--pupil {
        position: absolute;
      }
    }

    &__mouth {
      position: absolute;
      width: 80px;
      height: 4px;
      background-color: #2d2d2d;
      border-radius: 2px;
      transition: all 0.2s ease-out;
    }
  }

  .eye-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eyeball {
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease-out;

    &--blink {
      height: 2px !important;
    }
  }

  .pupil {
    border-radius: 50%;
    transition: transform 0.1s ease-out;
  }

  .pupil--solo {
    border-radius: 50%;
    transition: transform 0.1s ease-out;
  }

  @media (max-width: @screen-lg) {
    .login-ani {
      display: none;
    }
  }
</style>
