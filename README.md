# DevWorkshopTacoReact

The second pass at the Taco App, using React.

Here are the basic steps to get everything installed (using VirtualBox).

## Setup CentOS 7 (Minimal) on VirtualBox

#### Requirements:

> _Download [VirtualBox] (https://www.virtualbox.org/)_

> _Download [CentOS7] (http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1611.iso)_

I'm not going to walk you through the VirtualBox install because it's pretty simple and straight forward. I will however, go through the steps of installing CentOS in VirtualBox.

#### Create the VM

>* Once you have VirtualBox installed, open it up and click on the New icon on the top left of the toolbar.

>* Name your VM anything you want, but make sure you choose Linux as the type and Red Hat (64-bit) as the version.

>* Next, choose the amount of memory you'd like to reserve for this VM. I usually just go with the suggested amount, which in this case is 1024MB.

>* The next prompt will ask you to add a virtual hard disk. Go ahead and select Create a virtual hard disk now which should be the default.

>* Next, you can select whichever type of VM hard disk type you'd like. I usually select VHD because it gives me some manipulation options in Windows that the others don't.

>* The next prompt will ask you if you'd like dynamic storage or fixed storage. Select dynamic. Dynamic storage means that VirtualBox will only use the amount of space, on your real hard drive, that the VM actually needs until it reaches the maximum we allot. This will also allow us to add more to the VM later if we need it.

>* The next step is to actually allot the amount of hard disk space for the VM. 8.00GB will be more than plenty to start off. Go ahead and press the Create button to finish up this part of the process.

>* Your VirtualBox window should now contain a VM that is powered off. Let's go ahead and make sure we have the adapters that we need.

>* Right-click on the new VM and select Settings, then select Network from the left menu.

>* Adapter 1 needs to be Enabled, Attached to NAT, and (under Advanced) have the Cable Connected box checked.

>* Adapter 2 needs to be Enabled, Attached to Host-only Adapter, and (under Advanced) have the Cable Connected box checked.

>* Now that we've setup the setup, it's time to install the OS. 

#### Install CentOS 7

>* Find your newly created VM space and double click on it to start it up. You'll be prompted to point the manager to the iso we downloaded earlier. Locate the file and click start.

>* After you click start, VirtualBox will start the iso and you will be prompted to select an install mode. I usually just select Install CentOS 7, but it defaults to Test this media & install CentOS 7.

>* The install process will begin by asking you to select your language of preference. Once you've done that the next prompt will be to select the install destination.

>* Click on the Install Destination label and then immediately click Done at the top of the next window. Everything in this part of the install wizard has been set for us because of earlier selections we made when setting up the VM space.

>* You'll now notice that the Install Destination section no longer contains the warning that was previously there. Now you can click on Begin Install.

>* The install will begin, but there are still two more steps we need to take. The next window will give us the opportunity to set the root password and to add an additional account.

>* Select Root Password and create a new password for the root account.

>* Add another account so that you can log in to the VM without directly logging into root. Go ahead and make the user an administrator.

>* Click on Finish configuration.

>* The installer will complete a few more things and then you'll see a message at the bottom that says Complete and will find a button to reboot the VM. Go ahead and click Reboot to startup the VM for the first time. Once the VM reboots you'll be able to log in.

#### Preparing for 'Tech Stack'

> Run the following commands on the VM to prepare for other installations:
```
sudo yum install epel-release
sudo yum install nodejs  (this package will include npm)
sudo yum install python-pip
```

> Setup the Firewall:

>> _Docker Port: 3000/tcp_


```
sudo systemctl start firewalld.service

sudo firewall-cmd --permanent --zone=public --add-port=3000/tcp

sudo systemctl restart network
sudo systemctl restart firewalld
```

## Setup Docker Community Edition for CentOS

#### Setup the Repository
```
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum makecache fast
```

#### Install Docker CE (and start Docker)
```
sudo yum -y install docker-ce
sudo systemctl start docker
```

#### Test your Docker CE installation
```
sudo docker run hello-world
```

## Setup REACT (Front End)

#### Installation
```
npm install -g create-react-app
```

#### Quickstart Application
```
create-react-app taco-app
cd taco-app/
npm start
```

Should now be able to open http://192.168.56.101:3000/ to see your app. If it doesn't work, confirm your ip address by typing `ip addr` and look for the 192.* address.

## Setup EXPRESS (Web Server)

#### Installation
```
yum install gcc-c++ openssl-devel make
npm install -g express-generator
```

## Setup HUG (Back End / API)

#### Installation
```
sudo pip install hug -U
```

## Setup SQLite (Database)

#### Installation

> Already Installed
