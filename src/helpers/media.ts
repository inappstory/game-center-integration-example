export function onAllMediaLoaded(slideBox: HTMLElement, cb: () => void) {
    const loadMedia = function (media: HTMLMediaElement | HTMLImageElement) {
        return new Promise(function (resolve, reject) {
            if (media.tagName.toLowerCase() === 'img' && media instanceof HTMLImageElement) {
                const imageLoadHandler = () => {
                    // first frame after load
                    requestAnimationFrame(
                        () =>  // startRender
                            //Rendering start
                            requestAnimationFrame(() => {
                                resolve(media);
                                media.removeEventListener('load', imageLoadHandler);
                            })
                    );
                };
                media.addEventListener('load', imageLoadHandler);
                if (media.complete && media.naturalHeight !== 0) {

                    // first frame after load
                    requestAnimationFrame(
                        function () { // startRender
                            //Rendering start
                            requestAnimationFrame(function () {
                                resolve(media);
                            });
                        }
                    );

                }
            } else if (media.tagName.toLowerCase() === 'video' && media instanceof HTMLMediaElement) {
                if (media.oncanplaythrough !== undefined) {
                    const oncanplaythroughHandler = () =>
                        //Rendering start
                        requestAnimationFrame(() => requestAnimationFrame(() => {
                                resolve(media);
                                media.removeEventListener('canplaythrough', oncanplaythroughHandler);
                            })
                        )
                    ;
                    // first frame after load
                    // startRender
                    media.addEventListener('canplaythrough', oncanplaythroughHandler);
                    media.load();
                } else {
                    const videLoadHandler = () =>
                        //Rendering start
                        requestAnimationFrame(() => requestAnimationFrame(() => {
                                resolve(media);
                                media.removeEventListener('canplay', videLoadHandler);
                                // console.log('video - load');
                            })
                        );

                    media.addEventListener('canplay', videLoadHandler);
                    media.load();
                }

            }

            media.addEventListener('error', function (err: any) {
                reject(err)
            });

        });
    };

    const mediaElements = <NodeListOf<HTMLMediaElement | HTMLImageElement>>slideBox.querySelectorAll('img,video');

    let i;
    let promises = [];
    for (i = 0; i < mediaElements.length; ++i) {
        promises.push(loadMedia(mediaElements[i]));
    }
    if (promises.length > 0) {
        // min timeout 300ms
        promises.push(new Promise((resolve, reject) => setTimeout(resolve, 300)));
    }
    Promise.all(promises).then((values) => {
        cb();
    }).catch(cb);
}

const preloadImage = (src: string) => new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
        resolve(img);
    }
    img.onerror = reject;
    img.src = src;
});


export function preloadImages(sources: Array<string>) {
    return Promise.all(sources.map(preloadImage));
}
