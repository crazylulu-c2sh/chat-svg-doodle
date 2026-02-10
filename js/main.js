/**
 * SVG 에셋 기준 경로 (fetch 시 사용)
 */
const ASSETS = 'assets';

/**
 * 0. 외부 SVG 파일 로드 및 viewBox 정보 추출
 */
async function loadSVG(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(text, "image/svg+xml");
  const svgElement = svgDoc.querySelector("svg");

  return {
    paths: svgDoc.querySelectorAll("path"),
    viewBox: svgElement.getAttribute("viewBox"),
    width: svgElement.getAttribute("width"),
    height: svgElement.getAttribute("height")
  };
}

/**
 * 1-1. 색연필 느낌 강화 (중첩) - 각 path에 shadow 추가
 */
function createPencilShadows(path) {
  const shadows = [];
  const w = parseFloat(path.getAttribute("stroke-width") || 4);

  // 3-4개의 shadow 생성 (색연필: 섬세한 질감)
  const shadowCount = 3 + Math.floor(Math.random() * 2);
  for (let i = 0; i < shadowCount; i++) {
    const clone = path.cloneNode(true);

    // stroke-width 미세 변화 (섬세한 느낌)
    clone.setAttribute("stroke-width", w + Math.random() * 0.8);

    // opacity 범위 조정 (더 투명하고 가벼운 느낌)
    clone.setAttribute("stroke-opacity", 0.15 + Math.random() * 0.3);

    // 위치 변화 감소 (더 정교한 느낌)
    const offsetX = (Math.random() - 0.5) * 1.5;
    const offsetY = (Math.random() - 0.5) * 1.5;
    clone.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // 색연필 필터 적용
    clone.style.filter = "url(#pencil)";

    clone.dataset.shadow = "true";
    clone.dataset.texture = "pencil";
    shadows.push(clone);
  }

  return shadows;
}

/**
 * 1-2. 크레파스 느낌 강화 (중첩) - 각 path에 shadow 추가
 */
function createCrayonShadows(path) {
  const shadows = [];
  const w = parseFloat(path.getAttribute("stroke-width") || 4);

  // 4-6개의 shadow 생성 (크레파스: 거친 질감)
  const shadowCount = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < shadowCount; i++) {
    const clone = path.cloneNode(true);

    // stroke-width 변화 증가 (더 거친 느낌)
    clone.setAttribute("stroke-width", w + Math.random() * 2.5);

    // opacity 범위 확대 (더 다양한 농도)
    clone.setAttribute("stroke-opacity", 0.2 + Math.random() * 0.4);

    // 위치 변화 증가 (더 흩어진 느낌)
    const offsetX = (Math.random() - 0.5) * 3.5;
    const offsetY = (Math.random() - 0.5) * 3.5;
    clone.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // 크레파스 필터 적용
    clone.style.filter = "url(#crayon)";

    clone.dataset.shadow = "true";
    clone.dataset.texture = "crayon";
    shadows.push(clone);
  }

  return shadows;
}

/**
 * 1-3. 파스텔 느낌 강화 (중첩) - 각 path에 shadow 추가
 */
function createPastelShadows(path) {
  const shadows = [];
  const w = parseFloat(path.getAttribute("stroke-width") || 4);

  // 5-7개의 shadow 생성 (파스텔: 부드럽고 뭉개진 질감)
  const shadowCount = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < shadowCount; i++) {
    const clone = path.cloneNode(true);

    // stroke-width 큰 변화 (뭉개진 느낌)
    clone.setAttribute("stroke-width", w + Math.random() * 4);

    // opacity 매우 낮음 (부드러운 느낌)
    clone.setAttribute("stroke-opacity", 0.1 + Math.random() * 0.25);

    // 위치 변화 큼 (넓게 퍼진 느낌)
    const offsetX = (Math.random() - 0.5) * 5;
    const offsetY = (Math.random() - 0.5) * 5;
    clone.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // 파스텔 필터 적용
    clone.style.filter = "url(#pastel)";

    clone.dataset.shadow = "true";
    clone.dataset.texture = "pastel";
    shadows.push(clone);
  }

  return shadows;
}

/**
 * 1-4. 마커 느낌 강화 (중첩) - 각 path에 shadow 추가
 */
function createMarkerShadows(path) {
  const shadows = [];
  const w = parseFloat(path.getAttribute("stroke-width") || 4);

  // 2-3개의 shadow 생성 (마커: 진하고 균일한 질감)
  const shadowCount = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < shadowCount; i++) {
    const clone = path.cloneNode(true);

    // stroke-width 거의 변화 없음 (균일한 느낌)
    clone.setAttribute("stroke-width", w + Math.random() * 0.3);

    // opacity 높음 (진한 느낌)
    clone.setAttribute("stroke-opacity", 0.4 + Math.random() * 0.3);

    // 위치 변화 거의 없음 (정확한 느낌)
    const offsetX = (Math.random() - 0.5) * 0.5;
    const offsetY = (Math.random() - 0.5) * 0.5;
    clone.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // 마커 필터 적용
    clone.style.filter = "url(#marker)";

    clone.dataset.shadow = "true";
    clone.dataset.texture = "marker";
    shadows.push(clone);
  }

  return shadows;
}

/**
 * 1-5. 수채화 느낌 강화 (중첩) - 각 path에 shadow 추가
 */
function createWatercolorShadows(path) {
  const shadows = [];
  const w = parseFloat(path.getAttribute("stroke-width") || 4);

  // 6-8개의 shadow 생성 (수채화: 번지고 투명한 질감)
  const shadowCount = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < shadowCount; i++) {
    const clone = path.cloneNode(true);

    // stroke-width 다양한 변화 (번진 느낌)
    clone.setAttribute("stroke-width", w + Math.random() * 3);

    // opacity 매우 낮고 다양함 (투명하고 번진 느낌)
    clone.setAttribute("stroke-opacity", 0.05 + Math.random() * 0.2);

    // 위치 변화 매우 큼 (번진 느낌)
    const offsetX = (Math.random() - 0.5) * 6;
    const offsetY = (Math.random() - 0.5) * 6;
    clone.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // 수채화 필터 적용
    clone.style.filter = "url(#watercolor)";

    clone.dataset.shadow = "true";
    clone.dataset.texture = "watercolor";
    shadows.push(clone);
  }

  return shadows;
}

/**
 * 1-6. 질감 선택 (랜덤 또는 특정 질감)
 */
let selectedTexture = 'random'; // 기본값: 랜덤

function createShadowsByTexture(path, textureName) {
  const textureMap = {
    'pencil': createPencilShadows,
    'crayon': createCrayonShadows,
    'pastel': createPastelShadows,
    'marker': createMarkerShadows,
    'watercolor': createWatercolorShadows
  };

  if (textureName === 'random') {
    const textures = Object.values(textureMap);
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];
    return randomTexture(path);
  } else {
    return textureMap[textureName](path);
  }
}

/**
 * 2. 그리는 애니메이션 (랜덤 질감 효과 포함)
 */
async function drawAnimation(group, textureToUse) {
  const originalPaths = Array.from(group.querySelectorAll("path"));

  // 모든 path를 초기에 숨김
  originalPaths.forEach(p => p.style.opacity = "0");

  for (const path of originalPaths) {
    // 선택된 질감으로 shadow들 생성 및 추가
    const shadows = createShadowsByTexture(path, textureToUse);
    shadows.forEach(shadow => {
      group.insertBefore(shadow, path); // 원본 앞에 삽입
    });

    // 모든 path (shadow + 원본)에 애니메이션 적용
    const allPaths = [...shadows, path];

    for (const p of allPaths) {
      const length = p.getTotalLength();
      p.style.strokeDasharray = length;
      p.style.strokeDashoffset = length;
      p.style.opacity = "1"; // 애니메이션 시작 시 보이게
    }

    // reflow
    path.getBoundingClientRect();

    const duration = 200 + Math.random() * 300;

    // 동시에 애니메이션 시작
    allPaths.forEach(p => {
      p.style.transition = `stroke-dashoffset ${duration}ms linear`;
      p.style.strokeDashoffset = "0";
    });

    await new Promise(r => setTimeout(r, duration + 40));
  }
}

/**
 * 3. SVG 로드 및 그리기
 */
let currentSvgData = null;
let selectedDoodle = 'random'; // 기본값: 랜덤

async function loadAndDraw() {
  const container = document.querySelector("svg");
  const group = document.getElementById("doodle");

  // 이름 매핑
  const textureNames = {
    'pencil': '✏️ 색연필',
    'crayon': '🖍️ 크레파스',
    'pastel': '🎨 파스텔',
    'marker': '🖊️ 마커',
    'watercolor': '💧 수채화'
  };

  // 기존 path 제거
  group.innerHTML = '';

  // 로드할 파일 결정
  let doodleToLoad = selectedDoodle;
  if (selectedDoodle === 'random') {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    doodleToLoad = `doodle_0${randomNumber}.svg`;
  }

  // 사용할 질감 결정
  let textureToUse = selectedTexture;
  if (selectedTexture === 'random') {
    const textureKeys = Object.keys(textureNames);
    textureToUse = textureKeys[Math.floor(Math.random() * textureKeys.length)];
  }

  // 모든 하이라이트 초기화
  document.querySelectorAll('.texture-btn, .doodle-btn').forEach(btn => btn.classList.remove('highlight'));

  // 랜덤 선택 시 실제 선택된 항목 강조
  if (selectedDoodle === 'random') {
    const btn = document.querySelector(`.doodle-btn[data-doodle="${doodleToLoad}"]`);
    if (btn) btn.classList.add('highlight');
  }

  if (selectedTexture === 'random') {
    const btn = document.querySelector(`.texture-btn[data-texture="${textureToUse}"]`);
    if (btn) btn.classList.add('highlight');
  }

  console.log(`Loading: ${doodleToLoad}, Texture: ${textureToUse}`);

  // SVG 파일에서 정보 로드 (assets 경로 사용)
  currentSvgData = await loadSVG(`${ASSETS}/${doodleToLoad}`);

  // viewBox 자동 적용
  if (currentSvgData.viewBox) {
    container.setAttribute("viewBox", currentSvgData.viewBox);
  }

  // path 요소들 추가
  currentSvgData.paths.forEach(path => group.appendChild(path.cloneNode(true)));

  // 애니메이션 실행
  drawAnimation(group, textureToUse);
}

/**
 * 4. 버튼 이벤트 리스너
 */
function setupTextureButtons() {
  const buttons = document.querySelectorAll('.texture-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedTexture = button.dataset.texture;
      loadAndDraw();
    });
  });
}

/**
 * 4-2. 낙서 버튼 이벤트 리스너
 */
function setupDoodleButtons() {
  const buttons = document.querySelectorAll('.doodle-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedDoodle = button.dataset.doodle;
      loadAndDraw();
    });
  });
}

/**
 * 5. 메인 실행
 */
(async () => {
  setupTextureButtons();
  setupDoodleButtons();
  await loadAndDraw();
})();
