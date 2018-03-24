# EncasedJS
Encased, but in Javascript >:)

## Getting Started

Generate ssh key dulu kalo blom punya, bisa cari di settings, caranya ada di situ semua.
Jangan lupa download git juga

Clone Repository
```
git clone https://github.com/malfple/EncasedJS.git
```
link nya ada di kanan atas kok di (download/clone repository)

Nanti habis di clone, muncul folder EncasedJS, nah pindah ke direktori itu untuk command-command git selanjutnya

Di branch masing-masing, misal branch christo

Pull dari branch sendiri (harusnya g perlu, soalnya di repo sm komputer lu pasti lebih up to date komputer lu)
```
git pull origin christo
```
Pull dari branch master
```
git pull origin master
```
Pull dari branch orang
```
git pull origin siapapun
```

Push ke branch sendiri
```
git push origin christo
```
Jangan push ke branch orang :( atau ke master x(

Setelah edit-edit,
kalo mau push harus commit dulu

Untuk tambahin semua file yang ke-edit untuk di-commit
```
git add .
```
Commit, dengan message
```
git commit -m "Message di sini, bikin yang relevan, contoh: tambah button, etc"
```

Untuk liat status, sangat membantu
```
git status
```

Pindah branch, tapi mohon jangan sampai dilakukan :(
```
git checkout branchYangMauDituju
```
Bikin branch baru
```
git checkout -b branchYangMauDibuat
```

Tambahan-tambahan lain, tinggal liat help internal dari git
```
git help
```
