/**
 * 前凌智选 - Chrome 浏览器插件
 * popup.js - 产品搜索首页
 * 
 * 架构说明：
 * =============
 * 1. 首页变更为产品查询
 * 2. 右上角发布菜单：发布产品（跳转网页）、发布活动（次级页面）
 * 3. 搜索框支持按标签搜索
 * 4. 列表展示 mcp/query_kl 的结果
 * 
 * MCP 端点：
 * =============
 * - POST https://api.fore.vip/mcp/query_kl - 查询产品
 */

// MCP 端点
const MCP_QUERY_KL_URL = 'https://api.fore.vip/mcp/query_kl';

// 分页配置
const PAGE_SIZE = 20;
let currentSkip = 0;
let currentTag = '';
let hasMore = false;
let isLoading = false;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initPublishMenu();
    initSearch();
    loadProducts();
});

/**
 * 初始化发布菜单
 */
function initPublishMenu() {
    const publishBtn = document.getElementById('publishBtn');
    const publishMenu = document.getElementById('publishMenu');
    const publishProduct = document.getElementById('publishProduct');
    const publishActivity = document.getElementById('publishActivity');
    
    // 切换菜单显示
    publishBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        publishMenu.classList.toggle('show');
    });
    
    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        publishMenu.classList.remove('show');
    });
    
    // 发布产品 - 跳转到网页
    publishProduct.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://fore.vip/p/creator', '_blank');
    });
    
    // 发布活动 - 跳转到活动发布页面
    publishActivity.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('activity.html', '_blank');
    });
}

/**
 * 初始化搜索
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // 点击搜索按钮
    searchBtn.addEventListener('click', function() {
        currentTag = searchInput.value.trim();
        currentSkip = 0;
        loadProducts(true);
    });
    
    // 回车搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentTag = searchInput.value.trim();
            currentSkip = 0;
            loadProducts(true);
        }
    });
}

/**
 * 加载产品列表
 * @param {boolean} clear - 是否清空列表（搜索时使用）
 */
async function loadProducts(clear = false) {
    // 防止重复加载
    if (isLoading) return;
    isLoading = true;
    
    const productList = document.getElementById('productList');
    const loadMore = document.getElementById('loadMore');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // 显示加载状态
    if (clear) {
        productList.innerHTML = '<div class="loading">加载中...</div>';
        loadMore.style.display = 'none';
        errorMessage.style.display = 'none';
    }
    
    try {
        const response = await fetch(MCP_QUERY_KL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tag: currentTag || undefined,
                limit: PAGE_SIZE,
                skip: currentSkip
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // 隐藏错误信息
            errorMessage.style.display = 'none';
            
            // 渲染产品列表
            if (clear) {
                productList.innerHTML = '';
            }
            
            if (result.data.length === 0) {
                if (clear) {
                    productList.innerHTML = '<div class="empty-state">暂无产品</div>';
                }
                loadMore.style.display = 'none';
                hasMore = false;
            } else {
                // 添加产品卡片
                result.data.forEach(product => {
                    const card = createProductCard(product);
                    productList.appendChild(card);
                });
                
                // 更新加载更多按钮
                hasMore = result.hasMore;
                loadMore.style.display = hasMore ? 'block' : 'none';
                loadMoreBtn.disabled = false;
            }
            
            // 更新 skip
            currentSkip += result.data.length;
        } else {
            showError('加载失败：' + (result.message || '未知错误'));
            if (clear) {
                productList.innerHTML = '<div class="empty-state">加载失败</div>';
            }
        }
    } catch (error) {
        console.error('加载产品失败:', error);
        showError('网络错误：' + error.message);
        if (clear) {
            productList.innerHTML = '<div class="empty-state">加载失败</div>';
        }
    } finally {
        // 确保加载状态被隐藏
        isLoading = false;
        const loadingEl = productList.querySelector('.loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }
}

/**
 * 创建产品卡片
 * @param {object} product - 产品对象
 * @returns {HTMLElement} - 产品卡片 DOM 元素
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // 点击产品卡片跳转到详情页 - 修正链接
    card.addEventListener('click', function() {
        window.open(`https://fore.vip/p?id=${product.id}`, '_blank');
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

/**
 * 显示错误信息
 * @param {string} message - 错误信息
 */
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // 5 秒后自动隐藏
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

/**
 * HTML 转义
 * @param {string} text - 原始文本
 * @returns {string} - 转义后的文本
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 格式化热度
 * @param {number} hot - 热度值
 * @returns {string} - 格式化后的字符串
 */
function formatHot(hot) {
    if (hot >= 1000000) {
        return (hot / 1000000).toFixed(1) + 'M';
    } else if (hot >= 10000) {
        return (hot / 10000).toFixed(1) + 'w';
    } else {
        return hot.toString();
    }
}

// 加载更多
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', function() {
        if (hasMore && !isLoading) {
            loadMoreBtn.disabled = true;
            loadProducts(false);
        }
    });
});
