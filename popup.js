/**
 * 前凌智选 Chrome 插件 - popup.js
 * 版本：v1.4.4
 * MCP 端点：https://api.fore.vip/mcp/query_kl
 */

// MCP 端点
const MCP_QUERY_KL_URL = 'https://api.fore.vip/mcp/query_kl';
const PAGE_SIZE = 20;

// 状态
let currentTag = '';
let currentSkip = 0;
let hasMore = false;
let isLoading = false;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initPublishMenu();
    initSearch();
    initAutoLoad();
    loadProducts();
});

// 发布菜单
function initPublishMenu() {
    const publishBtn = document.getElementById('publishBtn');
    const publishMenu = document.getElementById('publishMenu');
    
    publishBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        publishMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
        publishMenu.classList.remove('show');
    });
    
    document.getElementById('publishProduct').addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://fore.vip/p/creator', '_blank');
    });
    
    document.getElementById('publishActivity').addEventListener('click', function(e) {
        e.preventDefault();
        alert('💡 发布产品后可以在产品主页发布活动获取收益！请先发布产品，然后在产品主页创建活动。');
    });
    
    document.getElementById('aboutLink').addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://doc.fore.vip', '_blank');
    });
}

// 搜索
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', function() {
        currentTag = searchInput.value.trim();
        currentSkip = 0;
        hasMore = false;
        loadProducts(true);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentTag = searchInput.value.trim();
            currentSkip = 0;
            hasMore = false;
            loadProducts(true);
        }
    });
}

// 自动加载
function initAutoLoad() {
    const productList = document.getElementById('productList');
    productList.addEventListener('scroll', function() {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 100 && hasMore && !isLoading) {
            loadProducts(false);
        }
    });
}

// 加载产品
async function loadProducts(clear = false) {
    if (isLoading) return;
    isLoading = true;
    
    const productList = document.getElementById('productList');
    const autoLoadIndicator = document.getElementById('autoLoadIndicator');
    const noMore = document.getElementById('noMore');
    
    if (clear) {
        productList.innerHTML = '<div class="loading">加载中...</div>';
        autoLoadIndicator.classList.remove('show');
        noMore.classList.remove('show');
    }
    
    try {
        const response = await fetch(MCP_QUERY_KL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: currentTag || undefined, limit: PAGE_SIZE, skip: currentSkip })
        });
        
        const result = await response.json();
        
        if (result.success) {
            if (clear) productList.innerHTML = '';
            
            if (result.data.length === 0) {
                if (clear) productList.innerHTML = '<div class="empty-state">暂无产品</div>';
                hasMore = false;
                noMore.classList.add('show');
            } else {
                result.data.forEach(product => {
                    productList.appendChild(createProductCard(product));
                });
                hasMore = result.hasMore;
                if (!hasMore) noMore.classList.add('show');
                currentSkip += result.data.length;
            }
        }
    } catch (error) {
        console.error('加载失败:', error);
    } finally {
        isLoading = false;
        const loadingEl = productList.querySelector('.loading');
        if (loadingEl) loadingEl.style.display = 'none';
    }
}

// 创建产品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.addEventListener('click', function() {
        window.open(`https://fore.vip/ai/s?id=${product.id}`, '_blank');
    });
    
    const hotIcon = product.hot >= 1000000 ? '🔥' : (product.hot >= 10000 ? '⭐' : '📌');
    card.innerHTML = `
        <div class="product-name">${escapeHtml(product.name)}</div>
        <div class="product-content">${escapeHtml(product.content)}</div>
        <div class="product-meta">
            <span class="product-tag">${escapeHtml(product.tag || '未分类')}</span>
            <span class="product-hot">${hotIcon} ${formatHot(product.hot)}</span>
        </div>
    `;
    return card;
}

// HTML 转义
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化热度
function formatHot(hot) {
    if (hot >= 1000000) return (hot / 1000000).toFixed(1) + 'M';
    if (hot >= 10000) return (hot / 10000).toFixed(1) + 'w';
    return hot.toString();
}
