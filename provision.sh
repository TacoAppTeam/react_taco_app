#!/bin/bash

############
##Disable SELinux
############
sudo setenforce Permissive
sudo sed -i "s/SELINUX=enforcing/SELINUX=disabled/" /etc/sysconfig/selinux

############
##Set timezone to Central
############
sudo rm /etc/localtime; sudo ln -s /usr/share/zoneinfo/America/Chicago /etc/localtime

############
##Generic Stuff
############
sudo yum install -y epel-release
sudo yum update -y

############
##Install Docker
############
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum-config-manager --enable docker-ce-edge
sudo yum install docker-ce -y
sudo bash -c 'cat << EOF > /etc/docker/daemon.json
{
  "storage-driver": "devicemapper"
}
EOF'
sudo chkconfig docker on
sudo systemctl start docker

pushd /vagrant
    sudo curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-Linux-x86_64 > docker-compose
    sudo mv docker-compose /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
popd

cat << EOF > ~/.vimrc
color desert
set autoindent
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
set number
set relativenumber
set directory^=~/.vim/tmp//
EOF
mkdir -p ~/.vim/tmp

sudo bash -c "cat << EOF > /etc/profile.d/custom_alias.sh

hfind () { find "$1" ! -readable -prune -name "$2"; }
alias sfind='sudo find '
alias cfind='find . ! -readable -prune -name '
alias rfind='find / ! -readable -prune -name '
alias dcrestart='sudo docker ps --filter status=dead --filter status=exited -aq | xargs -r sudo docker rm -v && sudo `which docker-compose` up'
EOF"


#based on: https://coderwall.com/p/fasnya/add-git-branch-name-to-bash-prompt
#placed in /etc/bashrc to avoid 'parse_git_branch not found'
#supposed to look like:
#parse_git_branch() {
#     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
#}
#export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "
sudo bash -c "cat << 'EOF' >> /etc/bashrc
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \\(.*\\)/ (\\1)/'
}
export PS1=\"\\u@\\h \\[\\033[32m\\]\\w\\[\\033[33m\\]\\\$(parse_git_branch)\\[\\033[00m\\] \\\$ \"

EOF"

#############
##Miscellaneous
#############
git config --global push.default simple

# Vim editor-config
cd ~
curl https://codeload.github.com/editorconfig/editorconfig-vim/zip/master > master.zip
unzip master.zip
cp -rf ~/editorconfig-vim-master/* ~/.vim/

echo "TNGDocker"

