// サイドバーの共通パーツ化
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
        <h2 class="text-center">管理ダッシュボード</h2>
        <a href="index.html"><i class="fas fa-home"></i> ダッシュボード</a>
        <a href="index2.html"><i class="fas fa-chart-line"></i> レポート</a>
        <a href="index3.html"><i class="fas fa-users"></i> ユーザー管理</a>
    `;
});

// グラフデータの表示
var ctx = document.getElementById('acquisitionChart').getContext('2d');
var acquisitionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['広告', 'その他', '直接アクセス', 'リファラル', '検索エンジン'],
        datasets: [{
            data: [17, 87, 38, 70, 22],
            backgroundColor: ['#1ABB9C', '#3498DB', '#9B59B6', '#E74C3C', '#F1C40F']
        }]
    },
    options: {
        responsive: true
    }
});

var ctx2 = document.getElementById('userByCountryChart').getContext('2d');
var userByCountryChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['日本', 'アメリカ', 'ドイツ', 'フランス', 'イギリス'],
        datasets: [{
            label: 'ユーザー数',
            data: [120, 200, 150, 100, 80],
            backgroundColor: '#1ABB9C'
        }]
    },
    options: {
        responsive: true
    }
});
