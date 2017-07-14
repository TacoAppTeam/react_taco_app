# -*- mode: ruby -*-
# vi: set ft=ruby :
#based off Vagrantfile from Batchlayer

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
# todo: mount ../staging on /var/tmp/staging

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "bento/centos-7.3"

  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  # Change oisserver to ois. Used by vagrant provisioner
  # config.vm.define "oisserver" do |v|
  #     v.vm.hostname = "openam.example.com"
  #     v.vm.network :private_network, ip: "192.168.56.11"
  # end

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048", "--cpus", 2]
    #vb.gui = true
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3000 #react app
  config.vm.network "forwarded_port", guest: 8000, host: 8000 #react app

  config.vm.synced_folder ".", "/home/vagrant/sync", disabled: true
  config.vm.synced_folder ".", "/vagrant"
  config.vm.synced_folder "SSH", "/home/vagrant/.ssh", type: "virtualbox", mount_options: ["dmode=700,fmode=700"]


  # config.vm.provision "shell" do |s|
  # 	s.path = "update-puppet.sh"
  # end
  config.vm.hostname = "TNG-Docker"
  config.vm.network :private_network, ip: "192.168.56.11"
  config.vm.provision :shell, :path => "provision.sh", privileged: false
end
