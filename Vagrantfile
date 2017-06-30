# -*- mode: ruby -*-
# vi: set ft=ruby :
#based off Vagrantfile from Batchlayer

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
# todo: mount ../staging on /var/tmp/staging

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "tng-basebox"
  config.vm.box_url = "https://artifactory.viasat.com/artifactory/api/vagrant/vagrant-local/tng-basebox"

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

  config.vm.network "forwarded_port", guest: 3306, host: 3306 #mariadb!
  config.vm.network "forwarded_port", guest: 5000, host: 5000 #flask?
  config.vm.network "forwarded_port", guest: 5001, host: 5001 #... forgot
  config.vm.network "forwarded_port", guest: 5002, host: 5002 #client API
  config.vm.network "forwarded_port", guest: 5672, host: 5672 #rabbit amqp
  config.vm.network "forwarded_port", guest: 6379, host: 6379 #redis
  config.vm.network "forwarded_port", guest: 8000, host: 8000 #web app
  config.vm.network "forwarded_port", guest: 8008, host: 8008 #alternative web app
  config.vm.network "forwarded_port", guest: 8080, host: 8080 #dispatcher
  config.vm.network "forwarded_port", guest: 8888, host: 8888 #track auth
  config.vm.network "forwarded_port", guest: 15672, host: 15672 #rabbit web mgmt tool
  config.vm.network "forwarded_port", guest: 15674, host: 15674 #rabbit websocket
  config.vm.network "forwarded_port", guest: 61613, host: 61613 #rabbit stomp (raw)

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
