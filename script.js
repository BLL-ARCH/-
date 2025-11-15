// 全模态AIGC能力展示平台 - JavaScript交互功能

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderPortfolioFromData();
    initializePortfolioFiltering();
    initializeModalSystem();
    initializeRouting();
    initializeMediaViewer();
    initializeScrollAnimations();
    initializeContactForm();
    initializeHeroAnimations();
    initializeLazyLoading();
    initializeResponsiveDesign();
});

// —— 全局模态函数（供各处调用） ——
function showModal(modalType, item = null) {
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = generateModalContent(modalType, item);
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    setTimeout(() => {
        const content = modal.querySelector('.modal-content');
        if (content) content.classList.add('animate-in');
        initializeVideoFallback();
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    if (content) content.classList.remove('animate-in');
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }, 300);
}

function generateModalContent(modalType, item = null) {
    const modalContents = {
        image: {
            title: '图像生成技术',
            description: '专业AI图像生成与处理技术',
            features: [
                'Stable Diffusion模型优化与微调',
                'ControlNet精确控制生成',
                'LoRA风格迁移与定制',
                '多分辨率高质量输出',
                '批量生成与自动化处理'
            ],
            tools: ['Stable Diffusion', 'Midjourney', 'DALL·E 3', 'ControlNet', 'LoRA'],
            metrics: ['生成速度: 2秒/张', '分辨率: 4K+', '风格支持: 50+']
        },
        video: {
            title: '视频生成技术',
            description: 'AI视频生成与动态内容创作',
            features: [
                'Runway Gen-2视频生成',
                'Pika Labs动画制作',
                'Deforum稳定扩散动画',
                '时序一致性控制',
                '多场景无缝切换'
            ],
            tools: ['Runway Gen-2', 'Pika Labs', 'Deforum', 'Sora', 'TemporalNet'],
            metrics: ['生成速度: 30秒/段', '时长支持: 60秒+', '分辨率: 1080p+']
        },
        text: {
            title: '文字生成技术',
            description: 'AI文字生成与自然语言处理',
            features: [
                'GPT-4大语言模型应用',
                '多语言内容生成',
                '专业领域文案定制',
                'SEO优化与关键词布局',
                '品牌语调一致性控制'
            ],
            tools: ['GPT-4', 'Claude 3', 'LLaMA 2', 'ChatGLM-4', 'LangChain'],
            metrics: ['生成速度: 实时', '语言支持: 12种', '准确率: 98%+']
        },
        audio: {
            title: '音频生成技术',
            description: 'AI音频生成与声音处理',
            features: [
                'Suno AI音乐生成',
                'ElevenLabs语音合成',
                '多语言配音制作',
                '背景音乐智能创作',
                '音频质量增强处理'
            ],
            tools: ['Suno AI', 'ElevenLabs', 'MusicGen', 'Whisper', 'AudioLM'],
            metrics: ['生成速度: 1分钟/首', '音乐风格: 20+', '语言支持: 15种']
        },
        multimodal: {
            title: '多模态融合技术',
            description: '跨模态内容生成与一致性控制',
            features: [
                '文本→图像→视频→音频全链路',
                '跨模态内容一致性控制',
                '多模态质量评估体系',
                '实时协同生成优化',
                '端到端自动化流程'
            ],
            tools: ['多模态对齐', '内容一致性', '质量评估', '协同优化', '自动化流程'],
            metrics: ['一致性: 95%+', '效率提升: 300%', '成本降低: 85%']
        }
    };

    const content = modalContents[modalType] || modalContents.multimodal;
    return `
        <div class="modal-header">
            <h2 class="modal-title">${content.title}</h2>
            <p class="modal-description">${content.description}</p>
        </div>
        <div class="modal-content-body">
            <div class="features-section">
                <h3>核心功能</h3>
                <ul class="features-list">
                    ${content.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="tools-section">
                <h3>技术工具</h3>
                <div class="tools-grid">
                    ${content.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
                </div>
            </div>
            <div class="metrics-section">
                <h3>性能指标</h3>
                <div class="metrics-grid">
                    ${content.metrics.map(m => `<div class="metric-item">${m}</div>`).join('')}
                </div>
            </div>
            ${item ? `
                <div class="project-details">
                    <h3>项目详情</h3>
                    <div class="project-info">
                        <div class="info-row"><span class="info-label">项目名称:</span><span class="info-value">${item.querySelector('.item-title')?.textContent || ''}</span></div>
                        <div class="info-row"><span class="info-label">应用场景:</span><span class="info-value">${item.querySelector('.item-scenario')?.textContent || ''}</span></div>
                        <div class="info-row"><span class="info-label">技术栈:</span><div class="tech-tags">${Array.from(item.querySelectorAll('.tech-item')).map(tag => `<span class="tech-tag">${tag.textContent}</span>`).join('')}</div></div>
                        <div class="info-row"><span class="info-label">项目指标:</span><div class="metrics">${Array.from(item.querySelectorAll('.metric')).map(metric => `<span class="metric-item">${metric.textContent}</span>`).join('')}</div></div>
                    </div>
                </div>
            ` : ''}
            ${item ? buildCategoryGalleryHTML(item) : ''}
            <div class="modal-actions">
                <button class="btn-primary" onclick="contactForProject('${modalType}')">咨询${content.title}项目</button>
                <button class="view-btn" onclick="closeModal()">关闭</button>
            </div>
        </div>
    `;
}

const DOC_THUMB = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="#2b2d31"/><text x="50%" y="50%" font-size="24" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">文档预览</text></svg>');
const VIDEO_THUMB = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="#1f2430"/><text x="50%" y="50%" font-size="24" fill="#7dd3fc" dominant-baseline="middle" text-anchor="middle">视频预览</text></svg>');

const PORTFOLIO_GROUPS = [
    { folder: 'images/电商项目/ip设计', scenario: 'commercial', scenarioLabel: '电商项目', modal: 'image', subtitle: 'IP形象', tech: ['Stable Diffusion','ControlNet'], files: ['BillfishBkePbo.PNG','BillfishzMXPgN.PNG','ComfyUI_00001_bgamx_1763026072.png','ComfyUI_00001_cbpkp_1763021173.png','ComfyUI_00001_dvzzm_1763027251.png','ComfyUI_00001_ncsas_1763026961.png','ComfyUI_00001_thkgr_1763022920.png','Image.png','e0e73ebc7fa08e73964c1916cecfd65.png','ee1170b5c4a2bc1276d407ed273053f.png','梨形卡通玩具运动系列海报_seedream_resized (1).png','梨形卡通玩具运动系列海报_seedream_resized.png'] },
    { folder: 'images/电商项目/产品溶图', scenario: 'commercial', scenarioLabel: '电商项目', modal: 'image', subtitle: '产品溶图', tech: ['Photoshop','SD'], files: ['图1.PNG','图2.PNG','图3.PNG','图4.PNG','图5.PNG','图6.PNG','图7.PNG','图8.PNG','图9.PNG','图10.png','图11.png','图12.PNG'] },
    { folder: 'images/电商项目/广告片', scenario: 'commercial', scenarioLabel: '电商项目', modal: 'video', subtitle: '广告片', files: ['109e78b97a39059d8eb8be2dff872dfd.mp4','11月15日.mp4','ComfyUI_00001_hohjm_1763087096.mp4'] },
    { folder: 'images/动漫项目/人物视图', scenario: 'creative', scenarioLabel: '动漫项目', modal: 'image', subtitle: '人物视图', files: ['066bb9d894f44f70ddf479f332fae7b_6cae9544.png','6570a057631fbe9f07c60466a15465f.png','6570a057631fbe9f07c60466a15465f_81691426.png','Generated Image October 29, 2025 - 10_00AM.png','Generated Image October 30, 2025 - 6_56PM.png','b9e98d1fbaf86f33f6f7a323c3ca097.png','e15372e1-2271-407b-9078-ad8664d492f2.png','e69d592781a9971686984806406a606.png','test.png'] },
    { folder: 'images/动漫项目/分镜图', scenario: 'creative', scenarioLabel: '动漫项目', modal: 'image', subtitle: '分镜图', files: ['0_0.png','8f0e9dcfbf3019a7617f548f1d76c39.png','BillfishRyQUeo.PNG','BillfishjDaPtZ.PNG','Generated Image October 26, 2025 - 6_24PM.png','Generated Image October 29, 2025 - 10_00AM.png','Generated Image October 29, 2025 - 4_14PM.png','Generated Image October 29, 2025 - 5_14PM.png','Generated Image October 30, 2025 - 7_56PM.png','Generated Image October 30, 2025 - 9_18PM.png','cfec7cc4fdd7d4572933bdb3f9d6510.png','正片.png'] },
    { folder: 'images/动漫项目/动漫视频', scenario: 'creative', scenarioLabel: '动漫项目', modal: 'video', subtitle: '动漫视频', files: ['不要让我知道你的名字.mp4','穿书.mp4'], thumb: 'images/动漫项目/人物视图/test.png' },
    { folder: 'images/短剧项目/人物转绘', scenario: 'education', scenarioLabel: '短剧项目', modal: 'image', subtitle: '人物转绘', files: ['3.png','BillfishdTKCkH.PNG','ComfyUI_00001_bgaki_1762864613.png','ComfyUI_00002_difjr_1762669305.png','ComfyUI_00002_eocfi_1762667046.png','ComfyUI_00002_fices_1762668120.png','ComfyUI_00004_flmhc_1762669494.png','ComfyUI_00006_ysugo_1762672271.png','ComfyUI_00013_btkfy_1762861888.png','图片2.png'] },
    { folder: 'images/短剧项目/短剧海报', scenario: 'education', scenarioLabel: '短剧项目', modal: 'image', subtitle: '短剧海报', files: ['4998f4b469be82efc55936b662067e0.png','BillfishjgcPuK.PNG','a2a2194a3293d6dda4d642668174f09.jpg','baca20b6d8799ecc784fe5aa0eb5bad.png','fe680cd90f31fb1bbca2fcf257da55a.jpg','images9.jpg','图片1.png','未标题-1.png','画板 1.png'] },
    { folder: 'images/短剧项目/短剧剧本', scenario: 'education', scenarioLabel: '短剧项目', modal: 'text', subtitle: '剧本文档', files: ['佛门显眼包（前10集）.pdf','全家读我心后，造反了（前10集）.pdf','全网通缉：我的黑客甜心（前十集）.pdf','女王的禁忌之狼（前10集）.pdf','山里来的野王妃（前10集）.pdf','我在后宫刷差评（前10集）.pdf','我的符箓能联网：天庭地府我摇人（前10集）.pdf','我靠吃瓜系统当皇后（前10集）.pdf','督军的锦鲤福宝（前10集）.pdf','预知四十年风口，我将破庙打造成千万IP（前10集）.pdf'] },
    { folder: 'images/官网项目/官网横幅', scenario: 'entertainment', scenarioLabel: '网页项目', modal: 'image', subtitle: '视觉设计', files: ['54f491ed1bdad2664f8079dcd2b8ad1.png','BillfishZoPimQ.PNG','BillfishmoxVmG.PNG','BillfishtSyInl.PNG','Billfishvzwcjj.PNG','header-bg.jpg','jimeng-2025-07-28-7519-21_9构图：概念图。横向展开的画面，。每一层都嵌入了代表不同年代的影像符号：从....jpeg','jimeng-2025-07-28-9643-海报构图：在影厅最后一排的角落，只有一个观众。他身体前倾，双手托腮，完全沉浸在电....jpeg','jimeng-2025-07-28-9733-21_9构图：一座通往云端的、由电影胶片或发光玻璃构成的螺旋阶梯。阶梯的每一级上....jpeg'], link: 'https://www.artentionfilms.com/index.html' },
    { folder: 'images/官网项目/官网页面', scenario: 'entertainment', scenarioLabel: '网页项目', modal: 'image', subtitle: '页面截图', files: ['02c02cc928b2b0f653e9081e0f06e5b.png','8393997ea02ca5a940e87050f279b2b.png','BillfishRBAjHj.PNG','BillfishocNaAm.PNG','BillfishpidzNE.PNG','BillfishymdYYg.PNG','ec5a269ebe54ab7a5c23e19a71e4101.png','组 164@1x.png'], link: 'https://www.artentionfilms.com/index.html' }
];

function buildCategoryGalleryHTML(item) {
    const groupFolder = item.getAttribute('data-group') || '';
    const group = PORTFOLIO_GROUPS.find(g => g.folder === groupFolder);
    if (!group) return '';
    const blocks = group.files.map(f => {
        const ext = f.split('.').pop().toLowerCase();
        const isVideo = ['mp4','webm','mov'].includes(ext);
        const isDoc = ['pdf','docx'].includes(ext);
        const path = `${group.folder}/${f}`;
        const media = isVideo 
            ? `<div class="gallery-media" data-type="video" data-src="${path}"><video controls preload="metadata" playsinline ${group.thumb ? `poster="${group.thumb}"` : ''} src="${path}" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></video></div>` 
            : isDoc 
                ? `<div class="gallery-media" data-type="doc" data-src="${path}"><img src="${DOC_THUMB}" alt="${f}" style="width:100%;border-radius:8px"></div><div style="margin-top:8px"><a class="btn-primary" href="${path}" target="_blank" rel="noopener">打开文档</a></div>` 
                : `<div class="gallery-media" data-type="image" data-src="${path}"><img src="${path}" alt="${f}" style="width:100%;border-radius:8px"></div>`;
        const action = group.link ? `<div style="margin-top:8px"><a class="btn-primary" href="${group.link}" target="_blank" rel="noopener">访问官网</a></div>` : '';
        const originalBtn = (!isVideo && !isDoc) ? `<div style="margin-top:8px"><a class="view-btn view-original" href="#">查看原图</a></div>` : '';
        return `
            <div class="gallery-item">
                ${media}
                <div class="gallery-caption">
                    <div class="caption-title">${group.subtitle}</div>
                    <div class="caption-meta">${f}</div>
                    ${action}
                </div>
            </div>
        `;
    });
    return `
        <div class="category-gallery">
            <h3>该组全部内容</h3>
            <div class="gallery-grid">${blocks.join('')}</div>
        </div>
    `;
}

// 导航功能
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // 移动端导航切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            } // 非哈希链接交给浏览器默认跳转

            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // 滚动时更新导航栏状态
    window.addEventListener('scroll', function() {
        updateNavbarState();
        updateActiveNavLink();
    });

    function updateNavbarState() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// 作品集筛选功能
function initializePortfolioFiltering() {
    const modalFilters = document.querySelectorAll('.modal-filters .filter-btn');
    const scenarioFilters = document.querySelectorAll('.scenario-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // 模态筛选
    modalFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            modalFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterPortfolioItems(filter, 'modal');
        });
    });

    // 应用场景筛选
    scenarioFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const scenario = this.getAttribute('data-scenario');
            scenarioFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterPortfolioItems(scenario, 'scenario');
        });
    });

    function filterPortfolioItems(filter, type) {
        portfolioItems.forEach(item => {
            const itemModal = item.getAttribute('data-modal');
            const itemScenario = item.getAttribute('data-scenario');
            
            let shouldShow = true;
            
            // 检查模态筛选
            const activeModalFilter = document.querySelector('.modal-filters .filter-btn.active');
            if (activeModalFilter && activeModalFilter.getAttribute('data-filter') !== 'all') {
                if (itemModal !== activeModalFilter.getAttribute('data-filter')) {
                    shouldShow = false;
                }
            }
            
            // 检查应用场景筛选
            const activeScenarioFilter = document.querySelector('.scenario-filters .filter-btn.active');
            if (activeScenarioFilter && activeScenarioFilter.getAttribute('data-scenario') !== 'all') {
                if (itemScenario !== activeScenarioFilter.getAttribute('data-scenario')) {
                    shouldShow = false;
                }
            }
            
            if (shouldShow) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }
}

// 模态系统
function initializeModalSystem() {
    const modalIcons = document.querySelectorAll('.modal-icon, [data-modal]');
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modal-body');

    // 模态图标点击事件
    modalIcons.forEach(icon => {
        // 避免作品集卡片整体点击触发（只通过“查看详情”按钮打开）
        if (icon.classList.contains('portfolio-item') || icon.closest('.portfolio-grid')) return;
        icon.addEventListener('click', function() {
            const modalType = this.getAttribute('data-modal');
            if (modalType) {
                showModal(modalType);
            }
        });
    });

    // 作品集项目点击查看详情
    const grid = document.querySelector('.portfolio-grid');
    if (grid) {
        grid.addEventListener('click', function(e) {
            const btn = e.target.closest('.view-btn');
            if (btn) {
                // 查看原图按钮
                if (btn.classList.contains('view-original')) {
                    e.preventDefault();
                    const item = btn.closest('.portfolio-item');
                    const img = item?.querySelector('.card-image img');
                    const title = item?.querySelector('.item-title')?.textContent || '';
                    if (img) openViewer('image', img.src, title);
                    return;
                }
                if (btn.tagName && btn.tagName.toLowerCase() === 'a') return; // 使用锚点默认跳转
                const item = btn.closest('.portfolio-item');
                const groupFolder = item.getAttribute('data-group');
                if (groupFolder) {
                    navigateToGroup(groupFolder);
                } else {
                    const modalType = item.getAttribute('data-modal');
                    showModal(modalType, item);
                }
            }
        });
    }

    // 关闭模态框
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 模态关闭按钮与遮罩
}

function ensureGroupPageContainer() {
    let page = document.getElementById('group-page');
    if (!page) {
        page = document.createElement('section');
        page.id = 'group-page';
        page.className = 'group-page container';
        document.body.appendChild(page);
    }
    return page;
}

function navigateToGroup(groupFolder) {
    window.location.href = 'group.html?group=' + encodeURIComponent(groupFolder);
}

function initializeRouting() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

function handleRoute() {
    const hash = location.hash || '';
    const params = new URLSearchParams(location.search || '');
    const groupParam = params.get('group');
    if (hash.startsWith('#group=')) {
        const groupFolder = decodeURIComponent(hash.replace('#group=', ''));
        renderGroupPage(groupFolder);
    } else if (groupParam) {
        renderGroupPage(groupParam);
    } else {
        hideGroupPage();
    }
}

function renderGroupPage(groupFolder) {
    const page = ensureGroupPageContainer();
    const portfolioSection = document.getElementById('portfolio');
    const group = PORTFOLIO_GROUPS.find(g => g.folder === groupFolder);
    if (!group) return;
    const blocks = group.files.map(f => {
        const ext = f.split('.').pop().toLowerCase();
        const isVideo = ['mp4','webm','mov'].includes(ext);
        const isDoc = ['pdf','docx'].includes(ext);
        const path = `${group.folder}/${f}`;
        const originalBtn = (!isVideo && !isDoc) ? `<div style="margin-top:8px"><a class="view-btn view-original" href="#">查看原图</a></div>` : '';
        const media = isVideo 
            ? `<div class="gallery-media" data-type="video" data-src="${path}"><video controls preload="metadata" playsinline ${group.thumb ? `poster="${group.thumb}"` : ''} src="${path}" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></video></div>` 
            : isDoc 
                ? `<div class="gallery-media" data-type="doc" data-src="${path}"><img src="${DOC_THUMB}" alt="${f}" style="width:100%;border-radius:8px"></div><div style="margin-top:8px"><a class="btn-primary" href="${path}" target="_blank" rel="noopener">打开文档</a></div>` 
                : `<div class="gallery-media" data-type="image" data-src="${path}"><img src="${path}" alt="${f}" style="width:100%;border-radius:8px"></div>`;
        const action = group.link ? `<div style="margin-top:8px"><a class="btn-primary" href="${group.link}" target="_blank" rel="noopener">访问官网</a></div>` : '';
        return `
            <div class="gallery-item">
                ${media}
                <div class="gallery-caption">
                    <div class="caption-title">${group.subtitle}</div>
                    <div class="caption-meta">${f}</div>
                    ${originalBtn}${action}
                </div>
            </div>
        `;
    }).join('');
    page.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">${group.scenarioLabel} · ${group.subtitle}</h2>
            <p class="section-subtitle">该组全部内容 (${group.files.length})</p>
        </div>
        <div class="category-gallery"><div class="gallery-grid">${blocks}</div></div>
        <div class="modal-actions" style="margin-top: var(--spacing-xl)">
            <a class="view-btn" href="index.html#portfolio">返回作品集</a>
        </div>
    `;
    if (portfolioSection) portfolioSection.style.display = 'none';
    page.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initializeVideoFallback();
    initializeVideoThumbnails();
}

function hideGroupPage() {
    const page = document.getElementById('group-page');
    const portfolioSection = document.getElementById('portfolio');
    if (page) page.style.display = 'none';
    if (portfolioSection) portfolioSection.style.display = '';
}

function openViewer(type, src, title) {
    const modal = document.getElementById('portfolio-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;
    let content = '';
    if (type === 'image') {
        content = `<div style="padding:16px; overflow:auto"><img src="${src}" alt="${title || ''}" style="display:block; width:auto; height:auto; max-width:calc(95vw - 64px); max-height:calc(85vh - 64px); border-radius:12px"></div>`;
    } else if (type === 'video') {
        content = `<div style="padding:16px"><video controls src="${src}" style="width:100%;border-radius:12px"></video></div>`;
    } else if (type === 'pdf') {
        content = `<div style="height:70vh"><iframe src="${src}" style="width:100%;height:100%;border:0;border-radius:12px"></iframe></div>`;
    }
    body.innerHTML = content + `<div class="modal-actions"><button class="view-btn" onclick="closeModal()">关闭</button></div>`;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    setTimeout(() => {
        const contentEl = modal.querySelector('.modal-content');
        if (contentEl) {
            contentEl.classList.add('animate-in');
            if (type === 'image') {
                contentEl.style.maxWidth = 'none';
                contentEl.style.width = '95vw';
                contentEl.style.maxHeight = 'none';
                contentEl.style.height = '95vh';
                contentEl.style.overflow = 'auto';
            }
        }
        const v = modal.querySelector('video');
        if (v && v.requestFullscreen) {
            v.requestFullscreen().catch(()=>{});
        }
    }, 10);
}

function initializeMediaViewer() {
    document.body.addEventListener('click', function(e) {
        const media = e.target.closest('.gallery-media');
        if (!media) return;
        const type = media.dataset.type || (media.querySelector('video') ? 'video' : 'image');
        const src = media.dataset.src || media.querySelector('img')?.src || media.querySelector('video')?.getAttribute('src') || '';
        const title = media.closest('.gallery-item')?.querySelector('.caption-title')?.textContent || '';
        if (type === 'image') {
            openViewer('image', src, title);
        } else if (type === 'video') {
            const video = media.querySelector('video');
            if (video && video.requestFullscreen) {
                video.requestFullscreen().catch(()=>{});
                video.play().catch(()=>{});
            } else {
                openViewer('video', src, title);
            }
        } else if (type === 'doc') {
            const ext = src.split('.').pop().toLowerCase();
            if (ext === 'pdf') {
                openViewer('pdf', src, title);
            } else {
                window.open(src, '_blank');
            }
        }
    });

    const grid = document.querySelector('.portfolio-grid');
    if (grid) {
        grid.addEventListener('click', function(e) {
            const imgEl = e.target.closest('.card-image img');
            if (!imgEl) return;
            e.preventDefault();
            e.stopPropagation();
            const title = imgEl.closest('.portfolio-item')?.querySelector('.item-title')?.textContent || '';
            openViewer('image', imgEl.src, title);
        });
    }

    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('.group-page .view-original');
        if (!btn) return;
        e.preventDefault();
        const item = btn.closest('.gallery-item');
        const media = item?.querySelector('.gallery-media[data-type="image"] img');
        const src = media?.getAttribute('src');
        const title = item?.querySelector('.caption-title')?.textContent || '';
        if (src) openViewer('image', src, title);
    });
}

function initializeVideoFallback() {
    const videos = document.querySelectorAll('.gallery-media[data-type="video"] video');
    videos.forEach(v => {
        const container = v.closest('.gallery-media');
        const src = v.getAttribute('src');
        const poster = v.getAttribute('poster');
        const fail = () => {
            if (!container) return;
            container.innerHTML = `
                <img src="${poster || ''}" alt="视频预览" style="width:100%;height:100%;object-fit:cover;border-radius:8px">
                <div style="position:absolute;bottom:8px;left:8px">
                    <a class="btn-primary" href="${src}" target="_blank" rel="noopener">打开原视频</a>
                </div>
            `;
        };
        v.addEventListener('error', fail, { once: true });
    });
}

function renderPortfolioFromData() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;
    const items = [];
    PORTFOLIO_GROUPS.forEach(group => {
        const first = group.files[0];
        const ext = first.split('.').pop().toLowerCase();
        const isDoc = ['pdf','docx'].includes(ext);
        const isVideo = ['mp4','webm','mov'].includes(ext);
        const thumb = group.thumb ? group.thumb : (isDoc ? DOC_THUMB : isVideo ? VIDEO_THUMB : `${group.folder}/${first}`);
        const labelClass = group.modal;
        const metricsText = group.modal === 'video' ? `视频数量：${group.files.length}` : group.modal === 'text' ? `文档数量：${group.files.length}` : `素材数量：${group.files.length}`;
        const techHtml = (group.tech || []).map(t => `<span class="tech-item">${t}</span>`).join('');
        const linkHtml = group.link ? `<a class="btn-primary" href="${group.link}" target="_blank" rel="noopener">访问官网</a>` : '';
        items.push(`
            <div class="portfolio-item" data-modal="${group.modal}" data-scenario="${group.scenario}" data-group="${group.folder}">
                <div class="item-card">
                    <div class="card-image">
                        <span class="modal-label ${labelClass}">${group.modal === 'image' ? '图像' : group.modal === 'video' ? '视频' : group.modal === 'text' ? '文字' : group.modal === 'audio' ? '音频' : '多模态'}</span>
                        <img src="${thumb}" alt="${group.subtitle}" loading="lazy">
                        ${group.modal === 'video' ? `<div class="play-overlay"><div class="play-button">▶</div></div>` : ''}
                    </div>
                    <div class="card-content">
                        <h4 class="item-title">${group.subtitle}</h4>
                        <p class="item-scenario">${group.scenarioLabel} | ${group.subtitle}</p>
                        ${techHtml ? `<div class="tech-stack">${techHtml}</div>` : ''}
                        <div class="project-metrics"><span class="metric">${metricsText}</span></div>
                        <a class="view-btn" href="group.html?group=${encodeURIComponent(group.folder)}">查看详情</a>
                        ${linkHtml}
                    </div>
                </div>
            </div>
        `);
    });
    grid.innerHTML = items.join('');
    initializeVideoCardThumbnails();
}

// 滚动动画
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 特殊动画处理
                if (entry.target.classList.contains('skill-card')) {
                    animateProgressBars(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('portfolio-item')) {
                    animatePortfolioItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(`
        .section-header,
        .skill-card,
        .timeline-item,
        .portfolio-item,
        .contact-content,
        .hero-content
    `);

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// 进度条动画
function animateProgressBars(card) {
    const progressBars = card.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
        }, index * 200);
    });
}

// 时间线动画
function animateTimelineItem(item) {
    item.classList.add('timeline-animate');
}

// 作品集项目动画
function animatePortfolioItem(item) {
    item.classList.add('portfolio-animate');
}

// 英雄区动画
function initializeHeroAnimations() {
    const particles = document.querySelectorAll('.particle');
    const modalIcons = document.querySelectorAll('.hero-modal-icons .modal-icon');

    // 粒子动画
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.2}s`;
        particle.addEventListener('click', function() {
            const modalType = this.getAttribute('data-modal');
            showModal(modalType);
        });
    });

    // 模态图标动画
    modalIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.addEventListener('click', function() {
            const modalType = this.getAttribute('data-modal');
            showModal(modalType);
        });
    });
}

// 联系表单
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm?.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    function handleFormSubmit() {
        if (!submitBtn) return;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 显示加载状态
        submitBtn.classList.add('loading');
        
        // 模拟AI匹配过程
        setTimeout(() => {
            // 模拟匹配结果
            const matchResult = simulateAIMatching(data);
            showMatchResult(matchResult);
            
            // 重置表单
            contactForm.reset();
            submitBtn.classList.remove('loading');
        }, 3000);
    }

    function simulateAIMatching(data) {
        const projectTypes = {
            'image': '图像生成项目',
            'video': '视频生成项目', 
            'text': '文字生成项目',
            'audio': '音频生成项目',
            'multimodal': '多模态融合项目',
            'consultation': '技术咨询项目'
        };

        const budgets = {
            '5k-10k': '5千-1万',
            '10k-50k': '1万-5万',
            '50k-100k': '5万-10万',
            '100k+': '10万以上',
            'discuss': '面议'
        };

        return {
            projectType: projectTypes[data['project-type']] || '综合项目',
            budget: budgets[data.budget] || '面议',
            estimatedTime: generateEstimatedTime(data['project-type']),
            recommendedTools: getRecommendedTools(data['project-type']),
            successRate: Math.floor(Math.random() * 20) + 80 + '%',
            matchScore: Math.floor(Math.random() * 20) + 80
        };
    }

    function generateEstimatedTime(projectType) {
        const timeRanges = {
            'image': '3-7天',
            'video': '7-14天',
            'text': '1-3天',
            'audio': '2-5天',
            'multimodal': '14-30天',
            'consultation': '1-2天'
        };
        return timeRanges[projectType] || '7-14天';
    }

    function getRecommendedTools(projectType) {
        const tools = {
            'image': ['Stable Diffusion', 'ControlNet', 'DALL·E 3'],
            'video': ['Runway Gen-2', 'Pika Labs', 'Deforum'],
            'text': ['GPT-4', 'Claude 3', 'LangChain'],
            'audio': ['Suno AI', 'ElevenLabs', 'MusicGen'],
            'multimodal': ['多模态融合', '内容一致性', '质量评估'],
            'consultation': ['技术评估', '方案设计', '实施指导']
        };
        return tools[projectType] || ['综合工具集'];
    }

    function showMatchResult(result) {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) return;

        modalBody.innerHTML = `
            <div class="match-result">
                <div class="match-header">
                    <h2>🎉 AI匹配成功！</h2>
                    <div class="match-score">
                        <span class="score-label">匹配度</span>
                        <span class="score-value">${result.matchScore}%</span>
                    </div>
                </div>
                
                <div class="match-details">
                    <div class="detail-item">
                        <span class="detail-label">项目类型:</span>
                        <span class="detail-value">${result.projectType}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">预算范围:</span>
                        <span class="detail-value">${result.budget}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">预计周期:</span>
                        <span class="detail-value">${result.estimatedTime}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">成功率:</span>
                        <span class="detail-value">${result.successRate}</span>
                    </div>
                </div>
                
                <div class="recommended-tools">
                    <h4>推荐技术工具</h4>
                    <div class="tools-grid">
                        ${result.recommendedTools.map(tool => 
                            `<span class="tool-tag">${tool}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="match-actions">
                    <button class="btn-primary" onclick="confirmProject()">
                        确认项目合作
                    </button>
                    <button class="btn-secondary" onclick="closeModal()">
                        稍后决定
                    </button>
                </div>
            </div>
        `;

        // 显示模态框
        const modal = document.getElementById('portfolio-modal');
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('animate-in');
        }, 10);
    }
}

// 确认项目合作
function confirmProject() {
    alert('感谢您的信任！我们将尽快与您联系，详细讨论项目实施方案。\n\n联系方式：\n📧 your.email@example.com\n💬 YourWeChatID\n🐙 github.com/your-username');
    closeModal();
}

// 联系项目咨询
function contactForProject(modalType) {
    closeModal();
    
    // 滚动到联系表单
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // 预填充项目类型
    const projectTypeSelect = document.getElementById('project-type');
    if (projectTypeSelect) {
        projectTypeSelect.value = modalType;
        projectTypeSelect.dispatchEvent(new Event('change'));
    }
}

// 懒加载
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // 触发加载
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// 响应式设计
function initializeResponsiveDesign() {
    // 检测触摸设备
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // 窗口大小改变时重新计算
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // 重新初始化相关功能
            updateNavbarState();
            recalculateAnimations();
        }, 250);
    });

    function recalculateAnimations() {
        // 重新计算动画相关参数
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            // 根据屏幕大小调整动画参数
        });
    }
}

// 工具函数
function updateNavbarState() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// 全局函数供HTML调用
window.showModal = showModal;
window.closeModal = closeModal;
window.contactForProject = contactForProject;
window.confirmProject = confirmProject;

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function generateVideoThumbnail(src, cb) {
    try {
        const video = document.createElement('video');
        video.src = src;
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.preload = 'metadata';
        const onLoaded = () => {
            try {
                const canvas = document.createElement('canvas');
                const w = Math.min(800, video.videoWidth || 800);
                const h = Math.floor(w * (video.videoHeight || 450) / (video.videoWidth || 800));
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, w, h);
                const dataURL = canvas.toDataURL('image/jpeg', 0.85);
                cb && cb(dataURL);
            } catch (err) {
                cb && cb('');
            }
        };
        video.addEventListener('loadeddata', onLoaded, { once: true });
        video.addEventListener('error', () => cb && cb(''), { once: true });
    } catch (e) {
        cb && cb('');
    }
}

function initializeVideoThumbnails() {
    const videos = document.querySelectorAll('.gallery-media[data-type="video"] video');
    videos.forEach(v => {
        const src = v.getAttribute('src');
        if (!src || v.getAttribute('poster')) return;
        generateVideoThumbnail(src, (thumb) => {
            if (thumb) v.setAttribute('poster', thumb);
        });
    });
}

function initializeVideoCardThumbnails() {
    PORTFOLIO_GROUPS.filter(g => g.modal === 'video').forEach(group => {
        const itemImg = document.querySelector(`.portfolio-item[data-group="${group.folder}"] .card-image img`);
        const firstVideo = group.files.find(f => /\.(mp4|webm|mov)$/i.test(f));
        if (!itemImg || !firstVideo) return;
        const src = `${group.folder}/${firstVideo}`;
        generateVideoThumbnail(src, (thumb) => {
            if (thumb) itemImg.src = thumb;
        });
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('AIGC Portfolio Error:', e.error);
    // 可以在这里添加错误上报逻辑
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        document.body.classList.add('paused');
    } else {
        // 页面可见时恢复动画
        document.body.classList.remove('paused');
    }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

console.log('🎨 全模态AIGC能力展示平台已加载完成！');
console.log('🚀 支持图像、视频、文字、音频生成与多模态融合技术');
console.log('💡 交互功能已激活，开始探索AIGC的无限可能！');