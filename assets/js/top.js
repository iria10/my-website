document.addEventListener('DOMContentLoaded', () => {

            const leftCircle = document.querySelector('.circle-left');
            const rightCircle = document.querySelector('.circle-right');
            const text = document.querySelector('.section-mv__text-area');

            // 要素が見つからない場合は処理を中断
            if (!leftCircle || !rightCircle || !text) {
                console.error('Animation elements not found!');
                return;
            }

            const scrollThreshold = 10;
            const animationLimit = 800;
            let isScrolling = false; // スクロールアニメーション中かどうかのフラグ

            // ★CSSに定義されているアニメーション設定を記憶しておく
            const defaultLeftAnimation = leftCircle.style.animation || window.getComputedStyle(leftCircle).animation;
            const defaultRightAnimation = rightCircle.style.animation || window.getComputedStyle(rightCircle).animation;


            function animateOnScroll() {
                let scrollY = window.scrollY;

                // スクロール量が閾値を超え、アニメーション範囲内の場合
                if (scrollY >= scrollThreshold && scrollY < animationLimit) {
                    isScrolling = true;
                    let leftMove = -scrollY * 0.5;
                    let rightMove = scrollY * 0.3;
                    let scale = Math.max(0.5, 1 - scrollY / 1000);
                    let textOpacity = Math.max(0, 1 - scrollY / 400);

                    // ★CSSアニメーションを無効化し、JSでtransformを適用
                    leftCircle.style.animation = 'none';
                    rightCircle.style.animation = 'none';
                    leftCircle.style.transform = `translateY(-50%) translateX(${leftMove}px) scale(${scale})`;
                    rightCircle.style.transform = `translateY(-50%) translateX(${rightMove}px) scale(${scale})`;
                    text.style.opacity = textOpacity;

                // スクロール量が閾値未満の場合 (ページ上部)
                } else if (scrollY < scrollThreshold) {
                    // ★スクロールアニメーションが終わった直後なら元に戻す
                    if (isScrolling) {
                        isScrolling = false;
                        // ★JSによるtransform指定を解除し、記憶しておいたCSSアニメーションを再設定
                        leftCircle.style.transform = ''; // ''にするとCSSのtransform: translateY(-50%)が適用されるはず
                        rightCircle.style.transform = '';
                        leftCircle.style.animation = defaultLeftAnimation; // 元のアニメーション設定に戻す
                        rightCircle.style.animation = defaultRightAnimation;
                    }
                    text.style.opacity = 1;

                // スクロール量がアニメーション範囲を超えた場合 (下までスクロール)
                } else { // scrollY >= animationLimit
                    isScrolling = true;
                    let finalLeftMove = -animationLimit * 0.5;
                    let finalRightMove = animationLimit * 0.3;
                    let finalScale = Math.max(0.5, 1 - animationLimit / 1000);

                    // ★CSSアニメーションは解除したまま、最終状態を適用
                    leftCircle.style.animation = 'none';
                    rightCircle.style.animation = 'none';
                    leftCircle.style.transform = `translateY(-50%) translateX(${finalLeftMove}px) scale(${finalScale})`;
                    rightCircle.style.transform = `translateY(-50%) translateX(${finalRightMove}px) scale(${finalScale})`;
                    text.style.opacity = 0;
                }
            }

            animateOnScroll();
            window.addEventListener('scroll', animateOnScroll);
        });