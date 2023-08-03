from flask import Flask,request,jsonify
from gevent import pywsgi
from flask_cors import CORS
import gmpy2
import numpy as np
import random
import time
import json
# from pyunit_prime import is_prime  #slower
# from pyunit_prime import get_large_prime_bit_size # slower get large prime #slower
from keygen import generate_random_number
MMM = []
PPP = 0
kkk1 = []
#Find the maximum number of conventions
def gcd(a,b):
    if b==0: return a
    else: return gcd(b, a%b)

# Extending Euclid's algorithm to find the modulo inverse
def findModReverse(a, m):

        if gcd(a, m) != 1:
            return None
        u1, u2, u3 = 1, 0, a
        v1, v2, v3 = 0, 1, m
        while v3 != 0:
            q = u3 // v3
            v1, v2, v3, u1, u2, u3 = (u1 - q * v1), (u2 - q * v2), (u3 - q * v3), v1, v2, v3
        return u1 % m


def divresult(m,):
    Mj = [1]* len(m)
    for i in range(0, len(m)):

        for j in range(0, len(m)):
            if (i == j):
                Mj[i] = Mj[i] * 1

            else:
                Mj[i] = Mj[i] * m[j]
    return Mj


#Solve for N and M
def fun1(d, t):
    N = 1
    M = 1
    for i in range(0,t):
        N=N*d[i]
    for i in range(len(d)-t+1, len(d)):
        M = M*d[i]
    return N, M


def getk(m,k,N,P):
    k1=[1]*len(m)
    r = random.randint(0,N//P-1)
    ks = k + r*P
    for i in range(0,len(m)):
        k1[i]=ks % m[i]
    k1=k1[0:len(m)]
    return k1, r

# Chinese residual definition to solve the equation
def ChineseSurplus(k,d,t,r,p):
    m = d[0:t]
    a = k[0:t]
    # Step1:Calculate the multiplication
    m1 = 1
    for i in range(0, len(m)):
        m1 = m1 * m[i]

    # Step2:Calculate Mj

    Mj = divresult(m)
    Mj1 = [0]* len(m)

    # Step3:Compute the inverse of the mode

    for i in range(0, len(m)):
        Mj1[i] = findModReverse(Mj[i], m[i])

    x = 0
    for i in range(0, len(m)):
        x = x + Mj[i] * Mj1[i] * a[i]
    result = x % m1
    return result - r*p


# Define the d array
# generate the appropriate d values

def judge1(m, num):
        flag1 = 1
        for i in range(0, num):
            for j in range(0, num):
                if (gcd(m[i], m[j]) != 1) & (i != j):
                    flag1 = 0
                    break
        return flag1

#generate m arrays
def getm(t, n, bit_k, k):
    P = -1
    m = [1]* n

    bit_d  = bit_k + n *int(n/5*2)
    #temp = random.randint(pow(10, 152), pow(10, 156)) # slower get large prime
    randfunc = random.SystemRandom()
    large_prime = gmpy2.mpz(randfunc.getrandbits(bit_d))
    large_prime = gmpy2.bit_set(large_prime, bit_d -1)
    temp = int(gmpy2.next_prime(large_prime))
    #temp = get_large_prime_bit_size(300) # slower get large prime
    #print(temp)
    m[0] = temp
    i = 1
    while (i < n):
        #temp = random.randint(pow(10, 152), pow(10, 160)) # slower get large prime
        large_prime = gmpy2.mpz(randfunc.getrandbits(bit_d+i))
        large_prime = gmpy2.bit_set(large_prime, bit_d +i- 1)
        temp = int(gmpy2.next_prime( large_prime))
        m[i] = temp
        # if (judge1(d, i + 1) == 1):  # slower get large prime
        i = i + 1

    N ,M = fun1(m, t)

    while(1):
        large_prime = gmpy2.mpz(randfunc.getrandbits(bit_k + 2))
        large_prime = gmpy2.bit_set(large_prime, bit_k - 1)
        temp = int(gmpy2.next_prime(large_prime))

        if (N > M * temp and temp > k):
            P = temp
            break
    return m, P  #获取正确的m数组

#Large 256-bit numbers as a test
if __name__ == '__main__':

    k = generate_random_number(4)
    print("S ", k)
    bit_k  = k.bit_length()
    #print("bits of k", bit_k)
    testlist = [5,7,9,11,13]

    timdis = []
    timrc = []

    round = 1
    #
    num = 0
    #
    for n in testlist:
        t = int(n/2)+1
        print("Ttttttttttttttttt ", t)
        ti = []
        t2 = []
        for i in range(round):
            start_dis = time.time()
            m, P = getm(t, n, bit_k, k)
            ###
            if num == 0:
                MMM = m
                PPP = P
            ###
            print("m数组为: ")
            print(m)
            print("P为: ")
            print(P)
            # step2:计算N和M的值

            N, M = fun1(m, t)
            print("N和M的值分别为:  ")
            print(N)
            print(M)
            print(N.bit_length())
            print(M.bit_length())
            # 求k

            k1, r = getk(m, k, N, P)
            print("x: ")
            print(k1)
            #
            if num == 0:
                kkk1 = k1
            #
            print("r: ")
            print(r)
            end_dis = time.time()

            ti.append(end_dis-start_dis)

            start = time.time()
            result = ChineseSurplus(k1, m, t, r, P)
            end = time.time()

            t2.append(end - start)
            num = num + 1

        timdis.append(sum(ti)/round)
        timrc.append(sum(t2)/round)


print('Running time dis:  Seconds', timdis)
print('Running time dis: Seconds', timrc)

print("result: ", result)
send1 ={}
send2 ={}
send3 ={}
send4={}
send5 = {}
#返回随机数和份额给前端
app = Flask(__name__)
CORS(app)
@app.route('/random1',methods=["POST","GET"])#这个是对函数的路由
def getnum():
    data = request.get_json()
    id1 = data['id']#获取用户id
    secretnum1 = [str(MMM[0]),str(kkk1[0]),str(PPP)]
    secretnum2 = [str(MMM[1]),str(kkk1[1]),str(PPP)]
    secretnum3 = [str(MMM[2]),str(kkk1[2]),str(PPP)]
    secretnum4 = [str(MMM[3]),str(kkk1[3]),str(PPP)]
    secretnum5 = [str(MMM[4]),str(kkk1[4]),str(PPP)]
    #5个秘密份额
    send1.update({str(id1):secretnum1})
    send2.update({str(id1):secretnum2})
    send3.update({str(id1):secretnum3})
    send4.update({str(id1):secretnum4})
    send5.update({str(id1):secretnum5})
    data = {
        "randomnumber": str(k),#注册完成时呈现给用户
    }
    return json.dumps(data)

#S m数组 P x数组
#id分别与密码、随机数、简历哈希值对应
id = []
password = {} #id-用户及加密后的登录密码
#sigrandom = {}
hash = {}
key = {}#id-用户加密前的eth私钥
randomS = {}
keynew = {}#存id—加密后的eth私钥键值对，永久存
#注册时存储id和密码
@app.route('/signup',methods=["POST","GET"])
def signup_data():
    data3 = request.get_json()
    id1 = data3['idup']
    password1 = data3['passwordup']
    key1 = data3['key']#获取加密后的eth私钥
    print(id1)
    print(password1)
    print(key1)
    flag1 = 0
    for a in id:
        if a == id1:
            flag1 = 1
            break
    if flag1==0:
        id.append(id1)
        password.update({str(id1):str(password1)})
        keynew.update({str(id1):str(key1)})
        #sigrandom.update({str(id1):str(k)})
        return "True"
    else:
        return "IDerror"
#登录时验证用户id及密码
@app.route('/signin',methods=["POST","GET"])
def signin_data():
    data4 = request.get_json()
    id1 = data4['idin']
    password1 = data4['passwordin']
    no = -1
    flag = 0
    if len(id) ==0 or len(password)==0:
        flag = 2
    if flag == 0:
        for a in id:
            no = no +1
            if no >=len(password):
                break
            if a ==id1:
                flag = 3
                if password[str(a)]==password1:
                    flag = 1
                break
    if flag == 1:
        return "True"
    elif flag ==2 or flag ==0:
        return "IDexisterror"
    else:
        return "Passworderror"
caaid = {
    "10497983":"jiangle",
    "8902138523":"qidyuanshenong",
    "782930134":"woaiyuan(shen",
    "58392035921":"wr3rt&3w#@t",
    "492895234752":"t34rfe43r",
}
caakey = {
    "10497983":"yuanshen",
    "8902138523":"xtu",
    "782930134":"3241",
    "58392035921":"fwef",
    "492895234752":"342",
}
companyid = {
    "42342481450":"rqweuygfs%$",
}
companykey = {
    "42342481450":"234",
}

#caa下载简历后删除对应用户id的秘密份额
@app.route('/download',methods=["POST","GET"])
def deletesecret():
    data1 = request.get_json()
    if data1['id']=="10497983":
        SEND6 = send1
        send1.clear()
        return json.dumps(SEND6)
    elif data1['id']=='8902138523':
        SEND7 = send2
        send2.clear()
        return json.dumps(SEND7)
    elif data1['id']=='782930134':
        SEND8 = send3
        send3.clear()
        return json.dumps(SEND8)
    elif data1['id']=='58392035921':
        SEND9 = send4
        send4.clear()
        return json.dumps(SEND9)
    elif data1['id']=='492895234752':
        SEND10 = send5
        send5.clear()
        return json.dumps(SEND10)
    else:
        return "NULL"
#caa与公司登录验证
@app.route('/caasignin',methods=["POST","GET"])
def caasignin_data():
    data5 = request.get_json()
    id1 = data5['idin']
    password1 = data5['passwordin']
    if str(id1) in caaid.keys():
        if str(password1) == caaid[str(id1)]:
            return "True"
        else:
            return "PasswordError"
    else:
        return "IDError"
@app.route('/comsignin',methods=["POST","GET"])
def companysignin_data():
    data5 = request.get_json()
    id1 = data5['idin']
    password1 = data5['passwordin']
    if str(id1) in companyid.keys():
        if str(password1) == companyid[str(id1)]:
            return "True"
        else:
            return "PasswordError"
    else:
        return "IDError"
# id = []
# password = {}
# sigrandom = {}
# hash = {}
#key = {}
#randomS ={}
#用户提交简历
@app.route('/delieve',methods = ["POST","GET"])
def add():
    data = request.get_json()
    id1 = data['id']
    hash1 = data['hash']
    key1 = data['ethkey']
    randomS1 = data['s']
    #
    data1 = {
        "id":id1,
        "hash":hash1,
        "ethkey":key1,
        "s":randomS1
    }
    #key = data['key']
    hash.update({str(id1):str(hash1)})
    key.update({str(id1):str(key1)})
    randomS.update({str(id1):str(randomS1)})
    return json.dumps(data1)
#ca获得待审简历的列表
@app.route('/getlist',methods=["POST","GET"])
def getall():
#文件哈希值是通过id值来定位的
    data1 = {
        "hash":hash,
        "ethkey":key,
        "s":randomS
    }
    return json.dumps(data1)
#根据id查找文件hash值
@app.route('/find',methods=["POST","GET"])
def get():
    data = request.get_json()
    id1 = data['id']
    if str(id1) in hash.keys():
        return str(hash[str(id1)])
    else:
        return "NULL"
#ca审核通过或不通过，传入用户私钥、ID、简历hash
@app.route('/decide',methods=["POST","GET"])
def delete():
    data1 = request.get_json()
    id1 = data1['id']
    key.pop(str(id1)) 
    hash.pop(str(id1))
    randomS.pop(str(id1))
    return "原神"


if __name__=='__main__' :
    server = pywsgi.WSGIServer(('127.0.0.1',8080),app)
    server.serve_forever()





