/*
 * Copyright 2021-2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.bytedance.ai.multimodal.teacher.vision.camera

import androidx.camera.core.ImageProxy

/** An interface to process the input camera frame and perform detection on it.  */
interface FrameProcessor {

    /** Processes the input frame with the underlying detector.  */
    fun process(data: ImageProxy, frameMetadata: FrameMetadata)

    /** Stops the underlying detector and release resources.  */
    fun stop()

    fun pause()

    fun resume()
}