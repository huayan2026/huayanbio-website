import re

with open(r'D:\华研生物\官网\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the exact pattern and insert img tag before prod-badge act in cow section
# Match: product-card div followed by prod-badge act with 激活试剂盒
pattern = r'(<div class="product-card">\s*)(<div class="prod-badge act">激活试剂盒</div>\s*<h3>牛卵母细胞孤雌激活试剂盒</h3>)'
replacement = r'\1<img src="img/icon-cow-activation-a.png" alt="牛卵母细胞孤雌激活试剂盒" class="prod-icon-img">\n          \2'

html_new, count = re.subn(pattern, replacement, html)
print(f'Replacements: {count}')

with open(r'D:\华研生物\官网\index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(html_new)

print('Done' if count > 0 else 'Pattern not matched - debugging...')
if count == 0:
    idx = html.find('牛卵母细胞孤雌激活试剂盒')
    chunk = html[idx-80:idx+30]
    print(repr(chunk))
